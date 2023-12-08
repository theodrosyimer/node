import { readdirSync, readFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

// source: [node.js - Alternative for __dirname in node when using the --experimental-modules flag - Stack Overflow]( https://stackoverflow.com/a/65895043/9103915)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log(__filename)
console.log(__dirname)

// bad because it's not a cross-platform solution!
// this breaks on windows
const output = readFileSync(new URL('./access.js', import.meta.url), 'utf8')
console.log(output)

// same problem as above
readdirSync(new URL('./', import.meta.url)).forEach(dirContent => {
  console.log(dirContent)
})
