/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
/* eslint-disable babel/no-invalid-this */
/* eslint-disable prettier/prettier */
import Benchmark from 'benchmark'

import { readCallback } from '../performance-tests/reading-file-methods/read-cb.js'
import { readStream } from '../stream/readfile-with-async-iterator.js'

const suite = new Benchmark.Suite()

suite
  .add('Callback', () => readCallback('../data.json'))
  .add('Stream', () => readStream('../data.json'))
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run({ async: true })
