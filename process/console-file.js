import { createWriteStream } from 'fs'
import { Console } from 'console'

export const buildLogger = () =>
  new Console({
    stdout: createWriteStream('./stdout.log'),
    stderr: createWriteStream('./stderr.log'),
  })

// const logv = 'log'
// logger[logv]('hello')

// const w = 'World'

// logger.log(`Hello ${w} log`)
// logger.info(`Hello ${w} info`)
// logger.debug(`Hello ${w} debug`)

// logger.warn('Warning: Bad practices detected !!')

// logger.error('Oops !! Something happened')
// logger.error(new Error('Oops !! Something happened'))
