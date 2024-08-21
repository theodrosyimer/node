import { dirname, join } from 'path'
import { pino, type Logger } from 'pino'
import { fileURLToPath } from 'url'

const ERROR_LOGS_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  'logs/all',
)

const ALL_LOGS_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  'logs/errors',
)

class Pino {
  instance: Logger
  constructor() {
    if (!this.instance) {
      this.instance = pino(
        pino.transport({
          targets: [
            {
              target: 'pino/file',
              level: 'info',
              options: {
                mkdir: true,
                destination: ERROR_LOGS_PATH,
              },
            },
            {
              target: 'pino/file',
              level: 'error',
              options: {
                mkdir: true,
                destination: ALL_LOGS_PATH,
              },
            },
            {
              target: 'pino-pretty',
              level: 'info',
              // options: {
              //   mkdir: true,
              //   destination: ALL_LOGS_PATH,
              // },
            },
          ],
        }),
      )
      this.instance.info('Logger initiated')
    }

    return this
  }
}

export default new Pino()
