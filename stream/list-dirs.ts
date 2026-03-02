import { join } from 'node:path'
import { homedir } from 'node:os'
import { glob } from 'node:fs/promises'

const cwd = join(homedir(), 'dev')
const dirs = glob('*', { cwd })
const listDirs = await Array.fromAsync(dirs)

console.log('[listDirs]:', listDirs)
