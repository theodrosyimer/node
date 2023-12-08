import { fileURLToPath } from 'url'

/**
 * @param {string} fileURL
 * @returns
 */
export function getFilename(fileURL) {
  return fileURLToPath(fileURL)
}

getFilename(import.meta.url)
