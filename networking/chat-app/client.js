/* eslint-disable no-unused-vars */
import net from 'net'
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { promisify } from 'util'

// const clearLine = promisify(output.clearLine)
// const moveCursor = promisify(output.moveCursor)

const rl = readline.createInterface({
  input,
  output,
})

/**
 * @param {import('node:tty').Direction} dir
 * @returns {Promise<void>}
 */
const clearLine = dir =>
  new Promise((resolve, reject) => {
    output.clearLine(dir, () => {
      resolve()
    })
  })

/**
 *
 * @param {number} dx number of columns to move cursor
 * @param {number} dy
 * @returns {Promise<void>}
 */
const moveCursor = (dx, dy) =>
  new Promise((resolve, reject) => {
    output.moveCursor(dx, dy, () => {
      resolve()
    })
  })

const socket = net.createConnection(
  {
    host: '127.0.0.1',
    port: 3008,
  },
  async () => {
    console.log('Connected to the server!')

    const ask = async () => {
      const message = await rl.question('Enter a message > ')

      await moveCursor(0, -1)
      await clearLine(0)
      socket.write(`${message}`)
    }

    ask()

    socket.on('data', async data => {
      console.log()
      await moveCursor(0, -1)
      await clearLine(0)

      console.log(`${data.toString('utf-8')}`)

      ask()
    })
  },
)

socket.on('end', () => {
  console.log('Connection was ended!')
})
