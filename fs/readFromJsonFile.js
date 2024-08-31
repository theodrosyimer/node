import { readFile as readFileCb } from 'fs'
import { readFile } from 'fs/promises'

/**
 *
 * @param {import('fs').PathOrFileDescriptor} path
 * @param {(...args: any[]) => unknown} cb
 */
export function readFromJsonFileCB(path, cb) {
  readFileCb(path, 'utf-8', (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

/**
 *
 * @param {import('fs').PathLike | import('fs').FileHandle} path
 * @param {(...args: any[]) => unknown} cb
 */
export async function readFromJsonFile(path, cb) {
  try {
    const fileContent = await readFile(path, { encoding: 'utf8' })

    cb(JSON.parse(fileContent))
  } catch (err) {
    console.error(err.message)
    cb([])
  }
}
