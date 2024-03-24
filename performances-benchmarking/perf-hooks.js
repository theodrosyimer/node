/* eslint-disable prettier/prettier */
import { performance, PerformanceObserver } from 'perf_hooks'

import { readCallback } from './read-cb.js'
import { readStream } from '../stream/readfile-with-async-iterator.js'

async function stream() {
  performance.mark('start-benchmarking')
  await readStream('../data.json')
  performance.mark('end-benchmarking')
  performance.measure('readStream', 'start-benchmarking', 'end-benchmarking')
}

function callback() {
  performance.mark('start-benchmarking')
  readCallback('../data.json')
  performance.mark('end-benchmarking')
  performance.measure('readCallback', 'start-benchmarking', 'end-benchmarking')
}

const performanceObserver = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    // logger
    //   .withTag('performance')
    //   .info(`${entry.name} took ${entry.duration.toFixed(2)} ms`)
    console.info(`${entry.name} took ${entry.duration.toFixed(2)} ms`)
  })
})
performanceObserver.observe({ entryTypes: ['measure'], buffered: true })

stream()

callback()
