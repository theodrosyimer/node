/* eslint-disable camelcase */
import { open, close, writeFile } from 'fs'
import { join } from 'path'

import { isMainModule } from '../url/is-file-main-module-esm.js'

console.log(isMainModule(import.meta.url))

// using `NODE_PATH` to set the root directory:
// `NODE_PATH=. node app.js`
console.log(join(process.env.NODE_PATH ?? '', 'data.json'))

writeToFile('./data3.json', {
  id: 11,
  first_name: 'Orsa',
  last_name: 'Montrose',
  email: 'omontrose9@sogou.com',
  gender: 'Female',
  ip_address: '181.147.69.70',
})

/**
 *
 * @param {import('fs').PathLike | import('fs').FileHandle} path
 * @param {{ flags?: 'a' | 'ax' | 'a+' | 'ax+' | 'as' | 'r' | 'rs' | 'r+' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+'; mode?: import('fs').Mode | null | undefined }} options flags default: 'wx', mode default: 0o666
 */
function writeToFile(path, data, { flags = 'wx', mode = 0o666 }) {
  open(path, flags, mode, (error, fd) => {
    if (error) {
      if (error.code === 'EEXIST') {
        console.error(`${path} already exists`)
        return
      }

      throw error
    }

    try {
      writeDataToFile(fd, data)
    } finally {
      close(fd, error => {
        if (error) throw error
      })
    }
  })
}

// grab correct jsdoc types for writeFile from `fs`

/**
 *
 * @param {import('fs').PathOrFileDescriptor} path
 * @param {string | NodeJS.ArrayBufferView} data
 */
export function writeDataToFile(path, data) {
  writeFile(
    path,
    typeof data === 'object' ? JSON.stringify(data) : data,
    error => {
      if (error) {
        console.error(error)
      }
      console.log('The file has been saved!')
    },
  )
}
