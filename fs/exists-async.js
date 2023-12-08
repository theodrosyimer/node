import { access } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// from: [Node.js — Check If a Path or File Exists](https://futurestud.io/tutorials/node-js-check-if-a-file-exists)
/**
 * Check if a file exists
 * @async
 * @param {string} p path to evaluate
 */
async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

// from: [node.js - Alternative for __dirname in node when using the --experimental-modules flag - Stack Overflow](https://stackoverflow.com/a/69242626/9103915)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const path = join(__dirname, 'array-from.js')
console.log(await exists(path))
