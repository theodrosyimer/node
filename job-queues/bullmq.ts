/**
 * BullMQ v5 — Exponential Backoff with Full Jitter + Error Classification
 *
 * Two key mechanisms:
 * 1. Queue-level: exponential backoff + jitter: 1.0 (full jitter)
 * 2. Worker-level: classify errors → throw UnrecoverableError for permanent failures
 *
 * Full jitter prevents thundering herd when multiple jobs fail simultaneously.
 * UnrecoverableError skips all remaining retry attempts for non-retryable errors.
 *
 * PATTERN CHOICE:
 * - Pattern A (built-in jitter: 1.0) — for internal jobs with NO upstream HTTP API
 *   (e.g., DB writes, in-process computation, module-to-module work).
 *   Cannot read Retry-After headers — purely time-based.
 *
 * - Pattern B (custom backoffStrategy) — PRODUCTION DEFAULT for any job calling
 *   external HTTP APIs. Respects Retry-After headers (returned by Stripe, GitHub,
 *   AWS, Google Cloud, Twilio on 429/503), falls back to exponential + full jitter
 *   when no header is present. Ignoring Retry-After in production means retrying
 *   too early (wasting attempts, risking bans) or too late (unnecessary delay).
 *
 * When in doubt, use Pattern B — it subsumes Pattern A's behavior when no
 * Retry-After header is present.
 */

import { Queue, Worker, UnrecoverableError } from 'bullmq'
import type { Job, ConnectionOptions } from 'bullmq'

// ---------------------------------------------------------------------------
// 1. Error classification
// ---------------------------------------------------------------------------

const TRANSIENT_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504])
const PERMANENT_STATUS_CODES = new Set([400, 401, 403, 404, 422, 501, 505])

type HttpErrorMetadata = {
  statusCode: number
  retryAfterMs?: number
}

function isTransientHttpError(statusCode: number): boolean {
  return TRANSIENT_STATUS_CODES.has(statusCode)
}

function isPermanentHttpError(statusCode: number): boolean {
  return PERMANENT_STATUS_CODES.has(statusCode)
}

// ---------------------------------------------------------------------------
// 2. Queue — exponential backoff with full jitter (Pattern A: internal jobs only)
//
// Use when the job does NOT call external HTTP APIs (no Retry-After to respect).
// For jobs calling Stripe, GitHub, AWS, etc. → use Pattern B (section 4) instead.
// ---------------------------------------------------------------------------

const connection: ConnectionOptions = {
  host: 'localhost',
  port: 6379,
}

const notificationQueue = new Queue('notifications', {
  connection,
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 1_000, // base delay: 1s → 2s → 4s → 8s → 16s (before jitter)
      jitter: 1.0, // FULL JITTER: randomize between 0 and the computed delay
    },
    removeOnComplete: true,
    removeOnFail: { age: 7 * 24 * 3600 }, // keep failed jobs 7 days for inspection
  },
})

// ---------------------------------------------------------------------------
// 3. Worker — classify errors, fail fast on permanent ones
// ---------------------------------------------------------------------------

const worker = new Worker<{ userId: string; templateId: string }>(
  'notifications',
  async (job: Job) => {
    const response = await fetch('https://api.email-provider.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job.data),
    })

    if (!response.ok) {
      const statusCode = response.status

      // Permanent error → UnrecoverableError → skip all remaining retries → move to failed
      if (isPermanentHttpError(statusCode)) {
        throw new UnrecoverableError(
          `Permanent failure: HTTP ${statusCode} — ${response.statusText}`,
        )
      }

      // Transient error → regular Error → BullMQ retries with exponential backoff + jitter
      if (isTransientHttpError(statusCode)) {
        throw new Error(
          `Transient failure: HTTP ${statusCode} — ${response.statusText}`,
        )
      }

      // Unknown status code → treat as transient (let retries decide)
      throw new Error(`Unexpected HTTP ${statusCode} — ${response.statusText}`)
    }
  },
  { connection, concurrency: 10 },
)

// ---------------------------------------------------------------------------
// 4. Custom backoff strategy (Pattern B: PRODUCTION DEFAULT for external HTTP APIs)
//
// Respects Retry-After headers when present, falls back to exponential + full
// jitter otherwise — identical to Pattern A's behavior in the fallback path.
// Use this for ANY job that calls external APIs (Stripe, Resend, etc.).
// ---------------------------------------------------------------------------

/**
 * PRODUCTION DEFAULT: Use this over Pattern A for any worker calling external APIs.
 * Retry-After headers are common in production (Stripe 429s, AWS 503s, etc.).
 * Ignoring them means retrying too early (wasted attempts, risk of bans) or too late.
 *
 * Jobs using this must set: backoff: { type: 'retry-after-aware' }
 */
const workerWithRetryAfter = new Worker(
  'rate-limited-api-calls',
  async (job: Job) => {
    const response = await fetch('https://api.stripe.com/v1/charges', {
      method: 'POST',
      body: JSON.stringify(job.data),
    })

    if (!response.ok) {
      const statusCode = response.status

      if (isPermanentHttpError(statusCode)) {
        throw new UnrecoverableError(`Permanent: HTTP ${statusCode}`)
      }

      // Attach Retry-After to the error so the backoff strategy can read it
      const retryAfter = response.headers.get('Retry-After')
      const error = new Error(`HTTP ${statusCode}`) as Error & HttpErrorMetadata
      error.statusCode = statusCode
      if (retryAfter) {
        error.retryAfterMs = Number.parseInt(retryAfter, 10) * 1_000
      }
      throw error
    }
  },
  {
    connection,
    concurrency: 5,
    settings: {
      backoffStrategy: (
        attemptsMade: number,
        _type?: string,
        err?: Error & Partial<HttpErrorMetadata>,
      ): number => {
        if (!err) return 1_000 // default to 1s if no error info is available

        // If upstream told us when to retry, respect it
        if (err.retryAfterMs && err.retryAfterMs > 0) {
          return err.retryAfterMs
        }

        // Otherwise: exponential backoff with full jitter
        const MAX_DELAY = 30_000
        const exponentialDelay = Math.min(MAX_DELAY, 1_000 * 2 ** attemptsMade)
        return Math.floor(Math.random() * exponentialDelay) // full jitter
      },
    },
  },
)

// ---------------------------------------------------------------------------
// 5. Observability — log retry attempts and permanent failures
// ---------------------------------------------------------------------------

worker.on('failed', (job: Job | undefined, err: Error) => {
  if (!job) return

  const isPermanent = err instanceof UnrecoverableError
  const attemptsLeft = (job.opts.attempts ?? 0) - job.attemptsMade

  // Use Pino logger here
  console.error({
    jobId: job.id,
    jobName: job.name,
    attemptsMade: job.attemptsMade,
    attemptsLeft: isPermanent ? 0 : attemptsLeft,
    permanent: isPermanent,
    error: err.message,
  })
})
