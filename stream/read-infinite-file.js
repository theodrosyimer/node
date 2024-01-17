import { createReadStream } from 'fs'

const randomReadStream = createReadStream('/dev/urandom')

let dataRead = 0
;(async () => {
  for await (const chunk of randomReadStream) {
    console.log(`Chunk: ${chunk}`)
    dataRead += chunk.length
    // console.log(`Received ${chunk.length} bytes of data.`)
  }
})()

process.on('SIGINT', () => {
  // console.log('Received SIGINT. Press Control-D to exit.')
  console.log('Data read:', formatBytes(dataRead))
  process.exit(0)
})

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}
