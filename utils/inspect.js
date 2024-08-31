import { formatWithOptions, inspect } from 'util'

/**
 * Log a nested object to the output stream with full depth.
 *
 * @example
 * logNestedObject({ foo: { bar: { baz: 'qux' } } })
 * @param {object} obj - The object to log
 */
export function logNestedObject(obj) {
  console.log(inspect(obj, { colors: true, depth: null }))
}

/**
 * Log a string to the output stream with a cyan color.
 *
 * @example
 * cyan('This text will appear cyan')
 * @param {string} text - The string to log
 */
export function cyan(text) {
  inspect.styles.string = 'cyan'
  console.log(formatWithOptions({ colors: true }, '%o', text))
  inspect.styles.string = 'white'
}
/**
 * Log a string to the error stream with a red color.
 *
 * @example
 * red('This text will appear red')
 * @param {string} text - The string to log
 */
export function red(text) {
  inspect.styles.string = 'red'
  console.error(formatWithOptions({ colors: true }, '%O', text))
  inspect.styles.string = 'white'
}
