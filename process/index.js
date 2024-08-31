import { buildLogger } from './console-file.js'
import { logger as loggerTty } from './console-tty.js'

console.log('[isTTY]:', ' test ', process.stdout.isTTY)

if (process.stdout.isTTY) {
  loggerTty.info('Hello World!')
} else {
  console.log('not TTY')
  const logger = buildLogger()
  logger.info('Hello World!')
}
