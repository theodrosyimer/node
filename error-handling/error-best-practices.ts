// centralized error object that derives from Node’s Error
// based on (+ added own comments): [nodebestpractices/sections/errorhandling/useonlythebuiltinerror.md at master · goldbergyoni/nodebestpractices](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/useonlythebuiltinerror.md)

const httpCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

type HttpCode = (typeof httpCode)[keyof typeof httpCode]
type AnyError<T = Error> = T extends Error ? T : never

export class DomainError extends Error {
  public readonly httpCode: HttpCode | undefined
  public readonly isOperational: boolean | undefined

  constructor(
    message?: string,
    options?: {
      name?: string
      httpCode?: HttpCode
      isOperational?: boolean
      cause?: AnyError
    },
  ) {
    super(message, { cause: options?.cause })

    // Set the prototype explicitly only needed if i need to support:
    //  - node < 6
    //  - IE < 11
    //  - ES < 2015
    // Object.setPrototypeOf(this, new.target.prototype)

    this.name = options?.name ?? 'DomainError'
    this.httpCode = options?.httpCode
    this.isOperational = options?.isOperational

    // i can pass a function to captureStackTrace to filter it out the stack trace
    Error.captureStackTrace(this, this.constructor /* or DomainError */)
    // Error.prepareStackTrace = (_, stack) => stack.map((frame) => frame)
    // Error.stackTraceLimit = Infinity
  }
}

const commonErrors = {
  RESOURCE_NOT_FOUND: 'ResourceNotFound',
  INTERNAL_SERVER_ERROR: 'InternalServerError',
}

const user = null

// client throwing an exception
if (user == null)
  throw new DomainError('This is my explanation', {
    name: commonErrors.RESOURCE_NOT_FOUND,
    httpCode: httpCode.NOT_FOUND,
    isOperational: true,
  })
