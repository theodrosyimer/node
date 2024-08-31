import { pass, fail } from '../promises/promises.ts'
import { setTimeout as sleep } from 'timers/promises'

async function dbClient() {
  await sleep(100)
  throw new Error('This is An error from "dbClient()"')
}

async function dbService() {
  try {
    await sleep(100)
    return await dbClient()
  } catch (err) {
    if (err instanceof Error) {
      console.info('[CATCH_ORIGIN]: dbService()')
      console.error('|->', err.message)
    }
  }
}

export async function app() {
  try {
    console.log('Executing dbService()...\n')
    await dbService()
  } catch (err) {
    if (err instanceof Error) {
      console.info('[CATCH_ORIGIN]: app()')
      console.error('|->', err.message)
    }
  }
}

app()
