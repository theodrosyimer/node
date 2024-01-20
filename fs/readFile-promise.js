import { open } from 'fs/promises'
import { join } from 'path'

import { getDirname } from '../url/get-dirname.js'
import { getFilename } from '../url/get-filename.js'
import { isMainModule } from '../url/is-file-main-module-esm.js'

console.log(getDirname(import.meta.url, 'data.json'))
console.log(getFilename(import.meta.url))
console.log(isMainModule(import.meta.url))

// using `NODE_PATH` to set the root directory:
// `NODE_PATH=. node app.js`
console.log(join(process.env.NODE_PATH ?? ''))

async function openToReadFile(path, flags = 'r+', mode = 0o666) {
  let filehandle

  try {
    filehandle = await open(path, flags, mode)

    const content = await filehandle.readFile({ encoding: 'utf8' })

    return content
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

console.log(
  await openToReadFile('/Users/mac/Code/refs/js-sandbox/node/data.json'),
)
