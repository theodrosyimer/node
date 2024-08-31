import { parseArgs, type ParseArgsConfig } from 'util'

const options = {
  foo: {
    type: 'boolean',
    short: 'f',
  },
  bar: {
    type: 'string',
  },
} satisfies ParseArgsConfig['options']

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options,
  // allowPositionals: true,
})
console.log('>>', values)
// console.log('>>', positionals)
