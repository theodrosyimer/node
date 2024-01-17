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

  signal.addEventListener(
    'abort',
    () => {
      console.log('\n\nThe food question timed out')
      console.log(`\nBye 👋🏿`)
      process.exit(0)
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
    if (error.code === 'ABORT_ERR') {
      console.error(
        'ABORTED!\nYou need to handle the signal properly, it seems like you forgot to exit the process.\nAdd `process.exit(exitCode)` at the end of your callback.',
      )
    }
  }
}
async function startPrompt(iterator) {
  for await (const line of iterator) {
    console.log(line)
  }
}

async function app(prompt) {
  try {
    await startPrompt(prompt)
  } catch (error) {
    console.log('AppError:', error)
  } finally {
    rl.close()
  }
}

rl.on('SIGINT', () => {
  console.log(`\n\nBye 👋🏿`)
  process.exit(0)
})

app(generatePrompt())
