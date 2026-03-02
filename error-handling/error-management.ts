import type { ServerResponse } from 'node:http'
import type { DomainError } from './error-best-practices.ts'

export class ErrorHandler {
  public async handleError(error: DomainError, responseStream: ServerResponse) {
    await logger.logError(error)
    await opentelemetry.recordError(error)
    await sentry.captureException(error)
    await crashIfUntrustedErrorOrSendResponse(error, responseStream)
  }

  isTrustedError(error: DomainError): boolean {
    return error?.isOperational ?? false
  }
}

// wrap just for the example to mimic a default export like in the original example
export const errorManagement = { handler: new ErrorHandler() }

const logger = {
  logError: async (error: DomainError) => {
    console.error(error)
  },
}

const opentelemetry = {
  recordError: async (error: DomainError) => {
    console.error(error)
  },
}

const sentry = {
  captureException: async (error: DomainError) => {
    console.error(error)
  },
}

const crashIfUntrustedErrorOrSendResponse = async (
  error: DomainError,
  responseStream: ServerResponse,
) => {
  if (!error.isOperational) {
    process.exit(1)
  }
  responseStream.statusCode = error.httpCode
  responseStream.end(error.message)
}

process.on('unhandledRejection', (reason: string, p: Promise<unknown>) => {
  // I just caught an unhandled promise rejection,
  // since we already have fallback handler for unhandled errors (see below),
  // let throw and let him handle that
  throw reason
})

process.on('uncaughtException', (error: DomainError) => {
  // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
  errorManagement.handler.handleError(error)
  if (!errorManagement.handler.isTrustedError(error)) process.exit(1)
})
