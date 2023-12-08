import { Readable } from 'node:stream'

// * Stream are async iterators
function* generate() {
  for (let i = 1; i < 1025; i++) {
    yield i
  }
}

async function run() {
  const rs = Readable.from(generate())
  for await (const chunk of rs) {
    console.log(chunk)
  }
}

run()
