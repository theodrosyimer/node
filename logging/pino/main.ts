import Pino from './pino-multi.js'

const logger = Pino.instance

logger.info('my first log attempt')
logger.error('my first error log attempt')
