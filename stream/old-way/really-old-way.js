import { Readable } from 'node:stream'

// Old way 1
const array = []
for (let i = 1; i < 1025; i++) {
  array.push(i)
}

const rs = new Readable({
  objectMode: true,
  read(n) {
    for (let i = 0; i < array.length; i++) {
      this.push(array[i])
    }
    this.push(null)
  },
})

rs.on('data', console.log)
