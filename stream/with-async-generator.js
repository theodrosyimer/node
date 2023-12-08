import { Readable } from 'node:stream'

async function* generate() {
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
