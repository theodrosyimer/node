import { pino, type Logger } from 'pino'

class Pino {
  static instance: Logger

  constructor() {
    if (!Pino.instance) {
      Pino.instance = pino()
      Pino.instance.info('Logger started!')
    }

    return Pino.instance
  }
}

export default new Pino()

const logger1 = Pino.instance
const logger2 = Pino.instance

logger1.info('my first log attempt')
logger2.info('my second log attempt')
