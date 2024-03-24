/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline as pipelinePromise } from 'node:stream/promises'
import split2 from 'split2'

const splitBySpace = split2(/\s/g)

await pipelinePromise(
  createReadStream('ancient_book.txt'),
  splitBySpace,
  processByWord,
  createWriteStream('restored_book.txt'),
)

async function* processByWord(source /* { signal } */) {
  // to work with strings rather than `Buffer`s.
  source.setEncoding('utf8')
  for await (let word of source) {
    console.log(word)
    word = word.replace(/\*/g, '$')
    yield `${word} `
  }
}
