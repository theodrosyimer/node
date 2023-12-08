import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({
  input,
  output,
})

async function* readlineGenerator() {
  const answer = await rl.question('You: ')
  yield answer

  yield console.log(`Thank you for your valuable feedback: ${answer}`)
}

const iterator = readlineGenerator()

iterator.next()
