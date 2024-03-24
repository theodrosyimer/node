import net from 'net'
import * as readline from 'node:readline/promises'
import * as readlineSync from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
// import { promisify } from 'util'

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
 * @param {number} dx number of columns to move cursor
 * @param {number} dy number of rows to move cursor
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
    console.log('Connected to the server!\n')

    const ask = async () => {
      const message = await rl.question('Enter a message > ')

      await moveCursor(0, -1)
      await clearLine(0)
      if (!socket.isPaused()) {
        socket.write(`${message}`)
      }
    }

    ask()

    readlineSync.emitKeypressEvents(process.stdin)
    if (process.stdin.isTTY) process.stdin.setRawMode(true)

    process.stdin.on('keypress', (_character, key) => {
      // console.log('character:', _character)
      // console.log('key:', key)

      if (key.name === 'x' && key.ctrl) {
        console.log('\nYou paused your connection')
        socket.pause()
      }
      if (key.name === 'r' && key.ctrl) {
        console.log('\nYou resumed your connection')
        socket.resume()
        ask()
      }
    })

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
  console.log('Your connection was ended!')
})

socket.on('close', () => {
  console.log('You closed your connection!')
  process.exitCode = 0
  process.exit()
})
