import { Console } from 'node:console'
import { stderr, stdout } from 'node:process'

export const logger = new Console({ stdout, stderr })

// const logv = 'log'
// logger[logv]('hello')

// const w = 'World'

// logger.log(`Hello ${w} log`)
// logger.info(`Hello ${w} info`)
// logger.debug(`Hello ${w} debug`)

// logger.warn('Warning: Bad practices detected !!')

// logger.error('Oops !! Something happened')
// logger.error(new Error('Oops !! Something happened'))
