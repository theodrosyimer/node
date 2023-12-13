import { Readable } from 'node:stream'

// Convert array and objects using `Readable.from()`
// Very nice for testing

// Old way 2
const array = []
for (let i = 1; i < 1025; i++) {
  array.push(i)
}

const rs = Readable.from(array)

rs.on('data', console.log)
