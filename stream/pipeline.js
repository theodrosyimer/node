import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { pipeline as pipelinePromise } from 'node:stream/promises'

const writable = createWriteStream('./stdin.txt')

const ac = new AbortController()
const { signal } = ac

const iterator = createIterator({ signal })

// Callback Pattern
pipeline(iterator, writable, (err, value) => {
  if (err) {
    console.error(err)
  } else {
    console.log(value, 'value returned')
  }
}).on('close', () => {
  ac.abort()
})

// Promise Pattern
pipelinePromise(iterator, writable)
  .then(value => {
    console.log(value, 'value returned')
  })
  .catch(err => {
    console.error(err)
    ac.abort()
  })

// or
const value = await pipelinePromise(process.stdin, writable).catch(err => {
  console.error(err)
  ac.abort()
})

console.log(value)
