import { inspect, styleText } from 'util'

/**
 * @param {unknown} data
 * @param {Object} options
 * @param {keyof Console} [options.type] defaults to `log`
 * @param {Parameters<typeof styleText>[0]} [options.format]
 * @param {boolean} [options.nested] defaults to `false`
 */
export function pretty(data, { type = 'log', format, nested = false } = {}) {
  if (!format) {
    // @ts-ignore
    console[type](data)
  } else {
    // @ts-ignore
    console[type](styleText(format, data))
  }
}

export function addLogDelimitation(separator = '-', count = 80) {
  console.log(`\n${separator.repeat(count)}\n`)
}

/**
 * Log a nested object to the output stream with full depth.
 *
 * @example
 * logNestedObject({ foo: { bar: { baz: 'qux' } } })
 *
 * @param {object} obj - The object to log
 * @param {Object} options
 * @param {keyof Console} [options.type] defaults to `log`
 * @param {Parameters<typeof styleText>[0]} [options.format]
 */
export function logNestedObject(obj, { type = 'log', format } = {}) {
  if (!format) {
    // @ts-ignore
    console[type](inspect(obj, { /* colors: true, */ depth: null }))
  } else {
    // @ts-ignore
    console[type](
      styleText(format, inspect(obj, { /* colors: true, */ depth: null })),
    )
  }
}
