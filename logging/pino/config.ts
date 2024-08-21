import { pino } from 'pino'
import pretty from 'pino-pretty'

let ttyLogger
const pinoSharedOpts = { level: 'info' }

if (process.stdout.isTTY) {
  const ttyOnlyOpts = {}
  ttyLogger = pino({ ...pinoSharedOpts, ...ttyOnlyOpts }, pretty())
}

export const logger =
  ttyLogger ?? pino(pino.destination({ dest: 'logs/info2', mkdir: true }))

// Nothing is printed
logger.debug('hi')

// Prints something
logger.info('hi')
