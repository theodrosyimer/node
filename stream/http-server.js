import { createReadStream } from 'fs'
import { createServer, request } from 'http'
import { finished, pipeline } from 'stream'
import { fileURLToPath } from 'url'

// when using `async` `await` on the server,
// ALWAYS put a catch handler
// Rule: use it when moving from a non-async function to an async function!!!!
// or beware of memory leaks.
// source: Stream into the future (NodeJS Streams) (timestamp: 23"07)
const server = createServer((req, res) => {
  console.log('>> request')

  // catch handler MUST be use in a non-async function to an async function
  print(req, res).catch(error => {
    if (error) {
      res.statusCode = 500
      res.end(error.message)
    }
  })
})

async function print(req, res) {
  req.setEncoding('utf8')
  let total = 0
  for await (const chunk of req) {
    total += chunk.length
  }
  res.end(`>> received ${total} characters!`)
}

server.listen(0, () => {
  console.log('>> listening')
  const duplex = request({
    port: server.address().port,
    method: 'POST',
  })

  pipeline(createReadStream(fileURLToPath(import.meta.url)), duplex, error => {
    if (error) {
      console.log(error)
    }
  })

  duplex.on('response', res => {
    res.pipe(process.stdout)
    finished(res, error => {
      if (error) {
        console.log(error)
      }
      console.log('')
      server.close()
    })
  })
})
