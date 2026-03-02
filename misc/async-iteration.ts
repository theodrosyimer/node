#!/usr/bin/env npx tsx

import { setTimeout } from 'timers/promises'

const arr = [1, 2, 3, 4, 5]

const ac = new AbortController()
const signal = ac.signal

// Set up signal handlers FIRST!!!
process.on('SIGINT', () => cleanup('SIGINT'))
process.on('SIGTERM', () => cleanup('SIGTERM'))
process.on('unhandledRejection', error => {
  console.error('Unhandled rejection:', error)
  process.exit(1)
})

signal.addEventListener(
  'abort',
  () => {
    console.log('AbortSignal fired!')
  },
  { once: true }
)

async function asyncMapper(input: number) {
  const addRandomTime = Math.random() * 2000
  console.log('[asyncMapper]', input, addRandomTime)

  try {
    await setTimeout(1000 + addRandomTime, undefined, { signal })
    console.log('[asyncMapper] completed', input)
    return input
  } catch (error) {
    console.log('[asyncMapper] aborted', input)
    throw error
  }
}

/**
 * Sequential async iteration
 * 1. Async Generator
 * Executes in order AND waits for the results to be returned to the caller for EACH item (instead of collecting them in an array and THEN returning them)
 */
// async function* asyncGenerator<T>(
//   data: T[],
//   callback: (item: T) => Promise<T>
// ) {
//   for (const item of data) {
//     yield await callback(item)
//   }
// }

// try {
//   console.log('Starting async generator...')
//   for await (const item of asyncGenerator(arr, asyncMapper)) {
//     console.log('[asyncGenerator]', item)
//   }
//   console.log('Async generator completed')
// } catch (error) {
//   console.log('Caught error in main loop:', error)
//   if (error instanceof Error && error.name === 'AbortError') {
//     console.log('Operation aborted')
//   } else {
//     console.error('Error:', error)
//   }
// }

/**
 * 2. Promise.all
 * Executes concurrently and collects the returned values in an array and THEN returning them
 * Using `.map` to iterate over the array guarantees the order of the results
 */
async function promiseAllMap(
  data: number[],
  callback: (item: number) => Promise<number>
) {
  const results = await Promise.all(data.map(callback))
  return results
}

const results = await promiseAllMap(arr, asyncMapper)
console.log('[promiseAllMap]', results)

/**
 * Using `for of`
 */
// async function forOfGood(
//   data: number[],
//   callback: (item: number) => Promise<number>
// ) {
//   const results = []
//   for (const item of data) {
//     results.push(callback(item))
//   }

//   return await Promise.all(results)
// }

// const results2 = await forOfGood(arr, asyncMapper)
// console.log('[forOfGood]', results2)

// async function forOfBad(
//   data: number[],
//   callback: (item: number) => Promise<number>
// ) {
//   const results = []
//   for (const item of data) {
//     results.push(await callback(item))
//   }
//   return results
// }

// const results3 = await forOfBad(arr, asyncMapper)
// console.log('[forOfBad]', results3)

function cleanup(signalName: string) {
  console.log()
  console.log(`Received ${signalName}, shutting down...`)
  console.log('Aborting controller...')
  ac.abort()
  console.log('Forcing exit...')
  process.exit(1)
}
