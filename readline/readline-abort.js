/* eslint-disable no-await-in-loop */
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({
  input,
  output,
})

async function* generatePrompt() {
  // const chatMessages = []

  const signal = AbortSignal.timeout(3_000)

  // * aborting will exit the current process
  signal.addEventListener(
    'abort',
    () => {
      console.log('\n\nThe food question timed out')
      console.log(`\nBye 👋🏿`)
      // comment this to test the error handling of `error.code === 'ABORT_ERR'`
      // process.exit(0)
    },
    { once: true },
  )

  try {
    while (true) {
      const userInput = await rl.question('\nYou: ')

      const answer = await rl.question('\nWhat is your favorite food? ', {
        signal,
      })
      // chatMessages.push({
      //   role: 'user',qrr
      //   content: userInput,
      // })

      const aiResponse = 'Oh yeah!'

      // chatMessages.push({
      //   role: 'user',
      //   content: aiResponse,
      // })

      yield `\nAI: ${aiResponse}`
    }
  } catch (error) {
    // 1. check if it is indeed an `Error` instance...
    if (error instanceof Error) {
      // this is an example of the use of a known error code
      if (error.code === 'ABORT_ERR') {
        console.error(
          'ABORTED!\nYou need to handle the signal properly, it seems like you forgot to exit the process.\nAdd `process.exit(exitCode)` at the end of your callback.',
        )
      }
      // if there are error codes use it, an example for checking if there is any (only useful during development)
      if (error.code) {
        // so it will be log here, now i can use the `error.code` to handle a particular use case if needed
        console.log(`ERROR CODE: ${error.code}`)
        console.log(`ERROR STACK: ${error.stack}`)
        return // ! handle it properly (just an example)
      }
      // but there are not always `error.code`...
      if (error.name) {
        // so it will be log here, now i can use the `error.code` to handle a particular use case if needed
        console.log(error.stack)
      }
    }

    // 2. ...otherwise do something with the error
    console.log(error)
  }
}

async function startPrompt(iterator) {
  for await (const line of iterator) {
    console.log(line)
  }
}

async function main(prompt) {
  try {
    await startPrompt(prompt())
  } catch (error) {
    console.error('AppError:', error)
  } finally {
    rl.close()
  }
}

rl.on('SIGINT', () => {
  console.log(`\n\nBye 👋🏿`)
  process.exit(0)
})

main(generatePrompt)
