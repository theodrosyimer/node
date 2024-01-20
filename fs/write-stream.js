/* eslint-disable no-shadow */
import { createWriteStream } from 'fs'
import { open } from 'fs/promises'
import { fileURLToPath } from 'node:url'

const modulePath = fileURLToPath(import.meta.url)

if (process.argv[1] === modulePath) {
  const filePath = process.argv[2] ?? modulePath

  console.log(`\nINPUT: ${filePath}\n`)

  await openWriteStream(filePath).catch(err => {
    if (err instanceof Error) {
      console.error(err)
    }
  })

  // await writeStream(filePath).catch((err) => {
  //   if (err instanceof Error) {
  //     console.error(err)
  //   }
  // })
}

/**
 *
 * @param {import('fs').PathLike | import('fs/promises').FileHandle} path
 * @param {'a' | 'ax' | 'a+' | 'ax+' | 'as' | 'r' | 'rs' | 'r+' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+'} flags
 * @param {import('fs').Mode | undefined} mode
 */
async function openWriteStreamExplanation(
  path,
  data,
  { flags = 'wx', mode = 0o666 },
) {
  let filehandle

  try {
    // make it crash by giving a path that does not exist
    filehandle = await open(path, flags, mode)
    console.log('File Handle created, still executing...')

    // happy path
    // let readStream = filehandle.createReadStream({ encoding: 'utf-8' })
    // console.log('Stream created, still executing...');

    // make it crash to see the `filehandle.close()` being executed
    const writeStream = filehandle.createWriteStream({ encoding: 'utf' })
    console.log('Stream created, still executing...')

    for (const chunk of data) {
      writeStream.write(chunk)
    }

    writeStream.end()
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
async function openWriteStream(path, data, { flags = 'wx', mode = 0o666 }) {
  let filehandle

  try {
    filehandle = await open(path, flags, mode)
    const writeStream = filehandle.createWriteStream({ encoding: 'utf-8' })

    for (const chunk of data) {
      writeStream.write(chunk)
    }

    writeStream.end()
  } catch (error) {
    console.error('\nError occurred!')
    throw error
  } finally {
    if (filehandle) {
      await filehandle.close()
    }
  }
}

export async function writeStream(filePath, data) {
  if (!filePath || !data) throw new Error(`Missing arguments!`)
  // set the encodings like this (otherwise it has a raw buffer type):
  const writeStream = createWriteStream(filePath, 'utf-8')

  // or like this:
  // rs.setEncoding('utf8')

  for (const chunk of data) {
    writeStream.write(chunk)
  }

  writeStream.end()
}
