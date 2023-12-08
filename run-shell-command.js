// source: node child_process.exec's documentation
import { promisify } from 'node:util'
import { exec as _exec } from 'node:child_process'

const exec = promisify(_exec)

async function lsExample() {
  const { stdout, stderr } = await exec('ls')
  // console.log(`stdout:\n\n${stdout}`)
  // console.error(`stderr:\n\n${stderr}`)
  return stdout ? stdout : stderr
}

await lsExample()
