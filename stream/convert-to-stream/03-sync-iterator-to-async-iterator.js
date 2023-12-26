import { Readable } from 'node:stream'

function* generate() {
  for (let i = 1; i < 1025; i++) {
    yield i
  }
}

async function run() {
  // convert sync iterator to async iterator!
  const rs = Readable.from(generate())
  for await (const chunk of rs) {
    console.log(chunk)
  }
}

run()
