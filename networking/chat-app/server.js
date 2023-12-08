/* eslint-disable no-unused-vars */
import net from 'net'
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { Readable } from 'stream'

const rl = readline.createInterface({
  input,
  output,
})

const server = net.createServer()

const clients = []

server.on('connection', socket => {
  console.log(`New connection from ${socket.remotePort} to the server!`)

  socket.on('end', () => {
    console.log(`Client from ${socket.remotePort} disconnected`)
  })

  socket.on('data', data => {
    for (let i = 0; i < clients.length; i++) {
      clients[i].write(data)
    }
  })

  clients.push(socket)
})

server.on('error', err => {
  throw err
})

server.listen(3008, '127.0.0.1', () => {
  console.log('opened server on', server.address())
})

// async function* generateChat() {}

// async function runChat() {
//   const rs = Readable.from()
//   for await (const chunk of rs) {
//     console.log(chunk)
//   }
// }
