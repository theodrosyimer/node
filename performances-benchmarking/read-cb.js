import { readFile } from 'fs'
import { fileURLToPath } from 'url'

export function readCallback(path) {
  readFile(path, 'utf-8', (err, fileContent) => {
    if (err) {
      return []
    }
    return JSON.parse(fileContent)
  })
}

const modulePath = fileURLToPath(import.meta.url)

if (process.argv[1] === modulePath) {
  const filePath = process.argv[2] ?? modulePath
  readCallback(filePath)
}
