import { setTimeout as sleep } from 'timers/promises'
import { fail } from '../promises/promises.ts'

async function dbClient() {
  await fail('This is an error from "dbClient()"', 100)
}

export async function dbService() {
  try {
    await sleep(100)
    return dbClient()
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
