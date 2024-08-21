#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'

// inspiration: [Use case for URLs: detecting if the current module is “main” (the app entry point)](https://exploringjs.com/nodejs-shell-scripting/ch_nodejs-path.html#detecting-if-module-is-main)
/**
 * Check if a module is run directly with node or is imported
 * from another module.
 * @param {ImportMeta} meta The `import.meta` object.
 * @return {boolean} The module is run directly.
 */
export default function isEntryPoint(meta) {
  if (!meta || !process.argv[1]) {
    return false
  }

  const filePath = process.argv[1]
  const modulePath = fileURLToPath(meta.url)
  const modulePathNoExtension = modulePath.substring(
    0,
    modulePath.lastIndexOf('.'),
  )

  return filePath === modulePath || filePath === modulePathNoExtension
}

console.log(isEntryPoint(import.meta))
