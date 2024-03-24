const fs = require('node:fs')
const readline = require('node:readline')

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`)
  }
}

processLineByLine()
