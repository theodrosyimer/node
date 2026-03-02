import type { ZodTypeAny } from "zod"
import { z } from "zod"

export function zParse<S extends ZodTypeAny, T = z.infer<S>>(schema: S, data: unknown) {
  return schema.parse(data) as T
}

/** @see [zod issue 3446](https://github.com/colinhacks/zod/issues/3446) */
export async function zParseAsync<S extends ZodTypeAny, T = z.infer<S>>(schema: S, data: unknown): Promise<T> {
  return schema.parseAsync(data) as Promise<T>
}

export interface HttpClient {
  sendRequest(url: string, options: HttpClientOptions): Promise<unknown>
}

export type HttpClientOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  query?: Record<string, string>
  body?: RequestInit['body']
  headers?: Record<string, string>
}

export interface HttpClientErrorOptions extends ErrorOptions {
  statusCode: number
  cause?: unknown
}

export class HttpClientError extends Error {
  statusCode: number

  constructor(message: string, options: HttpClientErrorOptions) {
    super(message, { cause: options.cause })
    this.statusCode = options.statusCode
  }
}

/**
 * Create a handler for API requests
 * @param path - The path of the API endpoint (MUST start with the forward slash and NOT include the prefix as it will be added automatically)
 * @param httpClient - The HTTP client to use for the request
 * @returns A function that can be used to make API requests
 */
export function createApiHandler(path: string, httpClient: HttpClient) {
  const url = new URL(/* `${getApiPrefix()} */`${path}`/* , getApiBaseUrlWithVersion() */)

  return async <TSchema extends ZodTypeAny>(schema: TSchema, httpRequest: HttpClientOptions) => {
    const response = await httpClient.sendRequest(url.toString(), httpRequest)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return zParse(schema, response)
  }
}
