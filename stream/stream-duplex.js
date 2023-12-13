// source: [Node.js Streams: Everything you need to know](https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/)

import { Duplex } from 'stream'

const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  },

  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++))
    if (this.currentCharCode > 90) {
      this.push(null)
    }
  },
})

inoutStream.currentCharCode = 65

process.stdin.pipe(inoutStream).pipe(process.stdout)
