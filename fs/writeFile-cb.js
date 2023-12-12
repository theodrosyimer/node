import { open, close, writeFile } from 'fs'
import { join } from 'path'
import { isMainModule } from '../url/is-file-main-module.js'

console.log(isMainModule(import.meta.url))

// using `NODE_PATH` to set the root directory:
// `NODE_PATH=. node app.js`
console.log(join(process.env.NODE_PATH ?? '', 'data.json'))

await writeToFile('./data3.json', '')

/**
 *
 * @param {import('fs').PathLike | import('fs').FileHandle} path
 * @param {'a' | 'ax' | 'a+' | 'ax+' | 'as' | 'r' | 'rs' | 'r+' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+'} flags
 * @param {import('fs').Mode | null | undefined} mode
 */
async function writeToFile(path, { flags, mode }) {
  open(path, flags ?? 'wx', mode ?? 0o666, (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.error(`${path} already exists`)
        return
      }

      throw err
    }

    try {
      writeDataToFile(fd, {
        id: 11,
        first_name: 'Orsa',
        last_name: 'Montrose',
        email: 'omontrose9@sogou.com',
        gender: 'Female',
        ip_address: '181.147.69.70',
      })
    } finally {
      close(fd, (err) => {
        if (err) throw err
      })
    }
  })
}

// grab correct jsdoc types for writeFile from `fs`

/**
 *
 * @param {import('fs').PathOrFileDescriptor} path
 * @param {string | NodeJS.ArrayBufferView} object
 */
export function writeDataToFile(path, object) {
  writeFile(
    path,
    typeof object === 'object' ? JSON.stringify(object) : object,
    (err) => {
      if (err) {
        console.error(err)
      }
      console.log('The file has been saved!')
    },
  )
}
