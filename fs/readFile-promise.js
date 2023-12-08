import { readFile } from 'fs/promises'
import { join } from 'path'
import { isMainModule } from '../url/is-file-main-module.js'
import { getDirname } from '../url/get-dirname.js'
import { getFilename } from '../url/get-filename.js'
import { readFromJsonFile } from './readFromJsonFile.js'

console.log(getDirname(import.meta.url, 'data.json'))
console.log(getFilename(import.meta.url))
console.log(isMainModule(import.meta.url))

// using `NODE_PATH` to set the root directory:
// `NODE_PATH=. node app.js`
console.log(join(process.env.NODE_PATH ?? ''))
console.log(join(process.env.NODE_PATH ?? '', 'data.json'))

readFromJsonFile(
  join(process.env.NODE_PATH ?? '', 'data.json'),
  fileContent => {
    console.log(fileContent)
  },
)
