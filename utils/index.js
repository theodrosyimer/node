import { pretty } from './colog.js'

const message = 'This is a message'
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const obj = {
  foo: 'bar',
  bar: 'foo',
}
const objNested = {
  foo: 11,
  bar: {
    baz: {
      qux: true,
      quux: 'quux',
    },
  },
}

const log = 'log'
const info = 'info'
const warn = 'warn'
const error = 'error'

pretty(`${message} -> ${log}`, { type: log } /* default */)
pretty(`${message} -> ${info}`, { type: info })
pretty(`${message} -> ${warn}`, { type: warn })
pretty(`${message} -> ${error}`, { type: error })

pretty(`${message} -> ${log}`, { type: 'log', format: ['bgYellow', 'black'] })
pretty(`${message} -> ${info}`, {
  type: 'info',
  format: ['underline', 'green'],
})
pretty(`${message} -> ${warn}`, { type: 'warn', format: ['bgYellow', 'black'] })
pretty(`${message} -> ${error}`, {
  type: 'error',
  format: ['bgRed', 'white'],
})

// this is not useful for objects and arrays
pretty(array, { type: 'error' })
pretty(obj, { type: 'error' })
pretty(objNested, { type: 'error' })
console.log(objNested)
