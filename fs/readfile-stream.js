import { createReadStream } from 'node:fs'
import { open } from 'fs/promises'
import { fileURLToPath } from 'node:url'

const modulePath = fileURLToPath(import.meta.url)

if (process.argv[1] === modulePath) {
  const filePath = process.argv[2] ?? modulePath

  console.log(`\nINPUT: ${filePath}\n`)

  const fileContent = await openReadStream(filePath).catch(err => {
    if (err instanceof Error) {
      console.error(err)
    }
  })

  // const fileContent = readStream(filePath).catch((err) => {
  //   if (err instanceof Error) {
  //     console.error(err)
  //   }q
  // })

  console.log(fileContent)
}

/**
 *
 * @param {import('fs').PathLike | import('fs/promises').FileHandle} path
 * @param {'a' | 'ax' | 'a+' | 'ax+' | 'as' | 'r' | 'rs' | 'r+' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+'} flags
 * @param {import('fs').Mode | undefined} mode
 */
async function openReadStreamExplanation(path, flags = 'a+', mode = 0o666) {
  let filehandle
  let chunks = ''

  try {
    // make it crash by giving a path that does not exist
    filehandle = await open(path, flags, mode)
    console.log('File Handle created, still executing...')

    // happy path
    // let readStream = filehandle.createReadStream({ encoding: 'utf-8' })
    // console.log('Stream created, still executing...');

    // make it crash to see the `filehandle.close()` being executed
    const readStream = filehandle.createReadStream({ encoding: 'utf' })
    console.log('Stream created, still executing...')

    for await (const chunk of readStream) {
      chunks += chunk
    }

    if (!chunks.length) return undefined

    return chunks
  } catch (error) {
    console.log('\nError occurred!')
    if (filehandle) {
      console.log('\nFile Handle still opened')
      // await filehandle.close()
      // throw error
    }

    // if (error.code === 'ENOENT') {
    //   console.error(`\n"${path}" does not exists`)
    //   throw error
    // }

    console.log('\nGONNA Throw')
    throw error
  } finally {
    if (filehandle) {
      await filehandle.close()
      console.log('\nFile Handle closed\n')
    }
  }
}

/**
 *
 * @param {import('fs').PathLike | import('fs/promises').FileHandle} path
 * @param {'a' | 'ax' | 'a+' | 'ax+' | 'as' | 'r' | 'rs' | 'r+' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+'} flags
 * @param {import('fs').Mode | undefined} mode
 */
async function openReadStream(path, flags = 'a+', mode = 0o666) {
  let filehandle
  let chunks = ''

  try {
    filehandle = await open(path, flags, mode)
    const readStream = filehandle.createReadStream({ encoding: 'utf-8' })

    for await (const chunk of readStream) {
      chunks += chunk
    }

    if (!chunks.length) return undefined

    return chunks
  } catch (error) {
    console.error('\nError occurred!')
    throw error
  } finally {
    if (filehandle) {
      await filehandle.close()
    }
  }
}

export async function readStream(filePath) {
  let chunks = ''
  // set the encodings like this (otherwise it has a raw buffer type):
  // const rs = createReadStream(filePath, 'utf-8')

  // or like this:
  // rs.setEncoding('utf8')

  for await (const chunk of createReadStream(filePath, 'utf-8')) {
    chunks += chunk
  }
  return chunks
}
