/* eslint-disable max-classes-per-file */

// stack trace API: [Stack trace API · V8](https://v8.dev/docs/stack-trace-api)

type AnyError<T = Error> = T extends Error ? T : never

class MyError extends Error {
  handleOrigin: string | undefined

  constructor(
    name: string,
    message: string,
    opts?: {
      cause: AnyError
    },
  ) {
    super(message, opts)
    // Set the prototype explicitly only needed if i need to support:
    //  - node < 6
    //  - IE < 11
    //  - ES < 2015
    // Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    // i can pass a function to captureStackTrace to filter it out the stack trace
    Error.captureStackTrace(this, this.constructor)
    // Error.prepareStackTrace = (_, stack) => stack.map((frame) => frame)
    // Error.stackTraceLimit = Infinity
    this.handleOrigin = this.getHandleOrigin.call(this)
  }

  // static isInstance(err: unknown): err is MyErrorAbstract {
  //   // eslint-disable-next-line eqeqeq
  //   if (err == null || typeof err !== 'object') {
  //     return false
  //   }

  //   return err instanceof MyErrorAbstract
  // }

  getHandleOrigin() {
    const stackLines = this.stack?.split('\n')

    if (!stackLines?.length) {
      return 'Unknown Location'
    }

    // console.log('[this.name]:', this.name)
    // console.log(`[${this.name} stackLines]:`, stackLines)
    // Assuming the call location is on the third line of the stack
    if (stackLines.length >= 4) {
      return stackLines[2]?.trim()
    }

    return stackLines[0]?.trim()
  }
}

class DbServiceError extends MyError {
  constructor(
    message: string,
    opts?: {
      cause: AnyError
    },
  ) {
    super('DbServiceError', message, opts)

    // i can pass a function to captureStackTrace to filter it out the stack trace
    Error.captureStackTrace(this, this.constructor)
    // Error.prepareStackTrace = (_, stack) => stack.map((frame) => frame)
    // Error.stackTraceLimit = Infinity
    this.handleOrigin = this.getHandleOrigin.call(this)
  }
}

class DbConnectionError extends MyError {
  // handleOrigin: string | undefined

  constructor(
    message: string,
    opts?: {
      cause: AnyError
    },
  ) {
    super('DbConnectionError', message, opts)

    // i can pass a function to captureStackTrace to filter it out the stack trace
    Error.captureStackTrace(this, this.constructor)
    // Error.prepareStackTrace = (_, stack) => stack.map((frame) => frame)
    // Error.stackTraceLimit = Infinity
    this.handleOrigin = this.getHandleOrigin()
  }
}

class NotMyError1 extends MyError {
  constructor(
    message: string,
    opts?: {
      cause: AnyError
    },
  ) {
    super('NotMyError1', message, opts)

    // i can pass a function to captureStackTrace to filter it out the stack trace
    Error.captureStackTrace(this, this.constructor)
    // Error.prepareStackTrace = (_, stack) => stack.map((frame) => frame)
    // Error.stackTraceLimit = Infinity
  }
}

class NotMyError2 extends Error {
  constructor(
    message: string,
    opts?: {
      cause: AnyError
    },
  ) {
    super(message, opts)

    // i can pass a function to captureStackTrace to filter it out the stack trace
    Error.captureStackTrace(this, this.constructor)
    // Error.prepareStackTrace = (_, stack) => stack.map((frame) => frame)
    // Error.stackTraceLimit = Infinity
  }
}

function dbService() {
  try {
    console.log('executing dbService that catches dbClient error...')
    dbClient()
  } catch (error) {
    if (error instanceof DbConnectionError) {
      throw new DbServiceError(error.message, {
        cause: error,
      })
    }
  }
}

function dbClient() {
  try {
    console.log('executing dbClient that throws...')
    // simulate an error to see the stack trace
    throw new NotMyError1('The database server is down!')
  } catch (error) {
    if (error instanceof NotMyError1) {
      throw new DbConnectionError(error.message, {
        cause: error,
      })
    }
  }
}

// console.log(`\n${'-'.repeat(80)}\n`)
// console.log('Example 3:\n')

try {
  dbService()
} catch (err) {
  if (err instanceof DbServiceError) {
    console.error()
    console.error(err)
  }
}
