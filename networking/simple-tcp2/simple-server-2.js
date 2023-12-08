import net from 'node:net'

// const server = net.createServer(socket => {
//   socket.write('Hello.')
//   socket.on('data', data => {
//     console.log(data.toString())
//   })
// })

const server = net.createServer(socket => {
  // 'connection' listener.
  console.log('client connected')

  socket.on('end', () => {
    console.log('client disconnected')
  })

  socket.write('hello\r\n')
  socket.pipe(socket)
})

server.on('error', err => {
  throw err
})

server.listen(8124, '127.0.0.1', () => {
  console.log('opened server on', server.address())
})
