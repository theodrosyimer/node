import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

/**
 * @param {string} fileURL
 * @param {string[] | [string[]]} rest
 * @returns
 */
export function getDirname(fileURL, ...rest) {
  if (fileURL == null || !fileURL.startsWith('file:'))
    throw new Error(
      `Expected a file url, received "${JSON.stringify(fileURL)}"`,
    )

  if (rest.length === 1 && Array.isArray(rest[0])) {
    return join(dirname(fileURLToPath(fileURL)), ...rest[0])
  }

  return join(dirname(fileURLToPath(fileURL)), ...rest)
}

getDirname(import.meta.url)
getDirname(import.meta.url, [])
getDirname(import.meta.url, '')
getDirname(import.meta.url, '..')
getDirname(import.meta.url, ['..'])
getDirname(import.meta.url, '..', '..', '..')
getDirname(import.meta.url, ['..', '..', '..'])

getDirname('file:')

// console.log(import.meta)
// console.log(getDirname.length)
