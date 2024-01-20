import { close, open, readFile } from 'fs'
import { fileURLToPath } from 'url'

import { getDirname } from '../url/get-dirname.js'
import { getFilename } from '../url/get-filename.js'
import { isMainModule } from '../url/is-file-main-module-esm.js'

console.log('JSON PATH:', getDirname(import.meta.url, '..', 'data.json'))
console.log('FILE PATH', getFilename(import.meta.url))
console.log('IS_MAIN_MODULE:', isMainModule(import.meta.url))

// using `NODE_PATH` to set the root directory:
// `NODE_PATH=. node app.js`
console.log('NODE_PATH:', process.env.NODE_PATH ?? undefined)

const modulePath = fileURLToPath(import.meta.url)

if (process.argv[1] === modulePath) {
  const filePath = process.argv[2] ?? modulePath

  console.log(
    'FILE_CONTENT:',
    openReadFile(filePath),
    'still not executed, scheduled to be executed!',
  )
}
/**
 *
 * @param {import('fs').PathOrFileDescriptor} path
 * @param {{ flags?: 'a' | 'ax' | 'a+' | 'ax+' | 'as' | 'r' | 'rs' | 'r+' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+'; mode?: import('fs').Mode | null | undefined }} options flags default: 'r', mode default: 0o666
 */
export function openReadFile(path, { flags = 'r', mode = 0o666 } = {}) {
  console.log(`\nINPUT_PATH: ${path}\n`)

  open(path, flags, mode, (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error(`${path} does not exist`)
        return
      }
      console.log('ERROR_FROM_OPEN:', err.stack)

      throw err
    }

    try {
      console.log('FILE_DESCRIPTOR:', fd)

      // fucking use the path, not the `fd`...
      return readFromFile(path)
    } finally {
      close(fd, err => {
        console.log('CLOSING FILE!')

        if (err) throw err
      })
    }
  })
}

/**
 *
 * @param {import('fs').PathOrFileDescriptor} path
 * @param {(err: NodeJS.ErrnoException | null, data: Buffer)} data
 */
export function readFromFile(path) {
  readFile(path, 'utf-8', (error, fileContent) => {
    console.log(`FILE_CONTENT:\n${fileContent}`)

    if (error) {
      console.error('FROM `readFromFile`:', error)

      // throw error
    }
    return fileContent
  })
}
