/* eslint-disable camelcase */
import fs from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// from create-svelte-app

/** @param {string} dir */
export function mkdirp(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true })
  } catch (e) {
    if (/** @type {any} */ (e).code === 'EEXIST') {
      return new Error(e.message)
    }
    throw e
  }
}

/** @param {string} path */
export function rimraf(path) {
  ;(fs.rmSync || fs.rmdirSync)(path, { recursive: true, force: true })
}

/**
 * @template T
 * @param {T} x
 */
function identity(x) {
  return x
}

/**
 * @param {string} from
 * @param {string} to
 * @param {(basename: string) => string} rename
 */
export function copy(from, to, rename = identity) {
  if (!fs.existsSync(from)) return

  const stats = fs.statSync(from)

  if (stats.isDirectory()) {
    fs.readdirSync(from).forEach(file => {
      copy(join(from, file), join(to, rename(file)))
    })
  } else {
    mkdirp(dirname(to))
    fs.copyFileSync(from, to)
  }
}

/** @param {string} path */
export function dist(path) {
  return fileURLToPath(new URL(`./dist/${path}`, import.meta.url).href)
}

/** @type {string} */
export const package_manager = getPackageManager() || 'npm'

/**
 * Supports npm, pnpm, Yarn, cnpm, bun and any other package manager that sets the
 * npm_config_user_agent env variable.
 * Thanks to https://github.com/zkochan/packages/tree/main/which-pm-runs for this code!
 */
export function getPackageManager() {
  // console.log(process.env.npm_config_user_agent)
  // console.log(process.env.npm_command)
  // console.log(process.env.npm_execpath)

  if (!process.env.npm_config_user_agent) {
    return undefined
  }
  const user_agent = process.env.npm_config_user_agent
  const pm_spec = user_agent.split(' ')[0]
  const separator_pos = pm_spec.lastIndexOf('/')
  const name = pm_spec.substring(0, separator_pos)

  return name === 'npminstall' ? 'npm' : name
}
