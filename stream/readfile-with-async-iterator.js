import { createReadStream } from 'node:fs'
import { fileURLToPath } from 'node:url'

export async function readStream(filePath) {
  let chunks = ''
  // set the encodings like this (otherwise it has a raw buffer type):
  const rs = createReadStream(filePath, 'utf-8')

  // or like this:
  // rs.setEncoding('utf8')

  for await (const chunk of rs) {
    chunks += chunk
  }
  return chunks
}

const modulePath = fileURLToPath(import.meta.url)

if (process.argv[1] === modulePath) {
  const filePath = process.argv[2] ?? modulePath
  await readStream(filePath)
}

export {}
