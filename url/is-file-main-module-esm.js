import { fileURLToPath } from 'url'

// inspiration: [Use case for URLs: detecting if the current module is “main” (the app entry point)](https://exploringjs.com/nodejs-shell-scripting/ch_nodejs-path.html#detecting-if-module-is-main)
/**
 * @param {string} fileURL
 * @returns
 */
export function isMainModule(fileURL) {
  if (fileURL.startsWith('file:')) {
    const modulePath = fileURLToPath(fileURL)
    if (process.argv[1] === modulePath) {
      return true
    }
  }
  return false
}
