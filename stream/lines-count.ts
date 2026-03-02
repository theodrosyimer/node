import { Readable } from 'stream'
import { pipeline } from 'stream/promises'
import { EOL } from 'os'

/**
 * @param chunkIterable An asynchronous or synchronous iterable
 * over “chunks” (arbitrary strings)
 * @returns An asynchronous iterable over “lines”
 * (strings with at most one newline that always appears at the end)
 */
async function* chunksToLines(chunkIterable: Readable) {
  let previous = ''
  const osEol = EOL

  for await (const chunk of chunkIterable) {
    let startSearch = previous.length
    previous += chunk
    while (true) {
      const eolIndex = previous.indexOf(osEol, startSearch)
      if (eolIndex < 0) break
      // line includes the EOL
      const line = previous.slice(0, eolIndex + 1)
      yield line
      previous = previous.slice(eolIndex + 1)
      startSearch = 0
    }
  }
  if (previous.length > 0) {
    yield previous
  }
}

async function* numberLines(lineIterable: NodeJS.ReadStream) {
  let lineNumber = 1
  for await (const line of lineIterable) {
    yield lineNumber + ' ' + line
    lineNumber++
  }
}

async function logLines(lineIterable: NodeJS.ReadStream) {
  for await (const line of lineIterable) {
    console.log(line)
  }
}

const chunks = Readable.from('Text with\nmultiple\nlines.\n', {
  encoding: 'utf8',
})

// logLines(numberLines(chunksToLines(chunks)))

await pipeline(chunks, chunksToLines, numberLines, logLines)
