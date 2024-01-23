import { inspect, formatWithOptions } from 'util'

export function addLogDelimitation(separator = '-', count = 80) {
  console.log(`\n${separator.repeat(count)}\n`)
}

export function cyan(str) {
  inspect.styles.string = 'cyan'
  console.log(formatWithOptions({ colors: true }, '%o', str))
  inspect.styles.string = 'white'
}

export function red(str) {
  inspect.styles.string = 'red'
  console.error(formatWithOptions({ colors: true }, '%O', str))
  inspect.styles.string = 'white'
}
