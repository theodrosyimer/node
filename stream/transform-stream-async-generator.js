/* eslint-disable no-unused-vars */
// import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline as pipelinePromise } from 'node:stream/promises'

// const ac = new AbortController()
// const { signal } = ac

await pipelinePromise(
  // createReadStream('lowercase.txt'),
  process.stdin,
  async function* (source /* { signal } */) {
    source.setEncoding('utf8') // Work with strings rather than `Buffer`s.
    for await (const chunk of source) {
      yield chunk.toUpperCase()
    }
  },
  // createWriteStream('uppercase.txt'),
  process.stdout,
)
