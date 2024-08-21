import { ReadLine } from 'readline'
// import * as readline from 'readline/promises'

// readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })

// import { pipeline } from 'node:stream/promises'

// await pipeline(
//   // createReadStream('lowercase.txt'),
//   process.stdin,
//   async function* (
//     source: AsyncIterable<Buffer>,
//     { signal }: { signal: AbortSignal },
//   ) {
//     // Rest of the code
//     source.setEncoding('utf8') // Work with strings rather than `Buffer`s.
//     for await (const chunk of source) {
//       yield chunk.toUpperCase()
//     }
//   },
//   // async function* (source, { signal }) {
//   // },
//   // createWriteStream('uppercase.txt'),
//   process.stdout,
//   // async function* () {
//   //   yield 'Pipeline succeeded.'
//   // },
// )
