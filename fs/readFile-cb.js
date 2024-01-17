import { close, open, readFile } from 'fs'
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
console.log(join(process.env.NODE_PATH ?? '', 'data.json'))

readFromFile(join(process.env.NODE_PATH ?? '', 'data.json'), fileContent => {
  console.log(fileContent)
})

/**
 *
 * @param {import('fs').PathOrFileDescriptor} path
 * @param {{ flags?: 'a' | 'ax' | 'a+' | 'ax+' | 'as' | 'r' | 'rs' | 'r+' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+'; mode?: import('fs').Mode | null | undefined }} options flags default: 'r', mode default: 0o666
 */
export function openReadFile(path, { flags = 'r', mode = 0o666 }) {
  open(path, flags, mode, (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('myfile does not exist')
        return
      }

      throw err
    }

    try {
      readFromFile(fd)
    } finally {
      close(fd, err => {
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
  readFile(path, (error, fileContent) => {
    if (error) {
      console.error(error)
      return error
    }
    return fileContent
  })
}
