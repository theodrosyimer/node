/* eslint-disable no-await-in-loop */
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({
  input,
  output,
})

async function* generatePrompt() {
  // const chatMessages = []

  while (true) {
    const userInput = await rl.question('\nYou: ')

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
    console.log('ERROR', error)
  } finally {
    rl.close()
  }
}

rl.on('SIGINT', () => {
  console.log(`\n\nBye 👋🏿`)
  process.exit(0)
})

app(generatePrompt())
