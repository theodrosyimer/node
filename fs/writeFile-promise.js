import { writeFile, open } from 'fs/promises'
import { join } from 'path'
import { isMainModule } from '../url/is-file-main-module.js'
import { getFilename } from '../url/get-filename.js'

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
async function writeToFile(path, flags = 'wx', mode = 0o666) {
  let filehandle

  try {
    filehandle = await open(path, flags, mode)

    await writeDataToFile(filehandle, {
      id: 11,
      first_name: 'John',
      last_name: 'Peter',
      email: 'johnpeter@example.com',
      gender: 'male',
      ip_address: '181.147.69.70',
    })
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.error(`"${path}" already exists`)
      return
    }

    throw error
  } finally {
    if (filehandle) {
      await filehandle.close()
    }
  }
}

/**
 *
 * @param {import('fs').PathLike | import('fs/promises').FileHandle} path
 * @param {*} object
 */
export async function writeDataToFile(path, object) {
  try {
    await writeFile(path, JSON.stringify(object))
  } catch (error) {
    console.error(error)
  }
}

async function openToReadFile(filename, flags = 'r+') {
  let filehandle

  try {
    filehandle = await open(filename, flags)
    const content = await filehandle.readFile({ encoding: 'utf8' })
    console.log(content)
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.error(`"${filename}" already exists`)
      return
    }
    throw error
  } finally {
    if (filehandle) {
      await filehandle.close()
    }
  }
}
