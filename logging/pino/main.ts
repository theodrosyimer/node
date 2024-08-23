import buildPinoMultiService from './pino-multi.js'

export async function serviceStart(options: Record<any, any>) {
  // Options include all the running dependencies of the service
  console.log('starting')

  return {
    async stop() {
      console.log('stopping')
      // shut everything down here
    },
  }
}

export function main() {
  const logger = buildPinoMultiService()
  logger.info('my first log attempt')
  logger.error('my first error log attempt')
}

main()
