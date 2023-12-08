import net from 'net'

const socket = net.createConnection(
  {
    host: '127.0.0.1',
    port: 8080,
  },
  () => {
    const buffer = Buffer.alloc(8)
    buffer[0] = 12
    buffer[1] = 34

    socket.write(buffer)
  }
)
