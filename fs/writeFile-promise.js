import { open, writeFile } from 'fs/promises'
import { join } from 'path'

import { getFilename } from '../url/get-filename.js'
import { isMainModule } from '../url/is-file-main-module-esm.js'

console.log(getFilename(import.meta.url))
console.log(isMainModule(import.meta.url))

// using `NODE_PATH` to set the root directory:
// `NODE_PATH=. node app.js`
console.log(join(process.env.NODE_PATH ?? '', 'data.json'))

// Similarly to `fsPromises.readFile` - `fsPromises.writeFile` is a convenience method that performs multiple `write` calls internally to write the buffer passed to it. For performance sensitive code consider using `fs.createWriteStream()` or `filehandle.createWriteStream()`.

await writeToFile('./data1.json', 'wx')

/**
 *
 * @param {import('fs').PathLike | import('fs/promises').FileHandle} path
 * @param {'a' | 'ax' | 'a+' | 'ax+' | 'as' | 'r' | 'rs' | 'r+' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+'} flags
 * @param {import('fs').Mode | undefined} mode
 */
async function writeToFile(path, data, { flags = 'wx', mode = 0o666 }) {
  let filehandle

  try {
    filehandle = await open(path, flags, mode)

    await writeDataToFile(filehandle, data)
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.error(`"${path}" already exists`)
      return error
    }

    throw error
  } finally {
    if (filehandle) {
      await filehandle.close()
    }
  }
}

/**
 *q
 * @param {import('fs').PathLike | import('fs/promises').FileHandle} path
 * @param {string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView> | import('stream').Stream} object
 */
export async function writeDataToFile(path, object) {
  try {
    await writeFile(path, JSON.stringify(object), 'utf-8')
  } catch (error) {
    console.error(error)
  }
}
