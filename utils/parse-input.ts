#!/usr/bin/env node

import { parseArgs, type ParseArgsConfig } from 'util'

const parseOptions = {
  create: {
    type: 'string',
    short: 'c',
  },
  select: {
    type: 'string',
    short: 's',
  },
  update: {
    type: 'string',
    short: 'u',
  },
  delete: {
    type: 'string',
    short: 'd',
  },
  'truncate-all': {
    type: 'boolean',
    short: 't',
  },
  'drop-table': { type: 'string', short: 'd' },
} satisfies ParseArgsConfig['options']

export const parse = (
  args: string[],
  options: ParseArgsConfig['options'] = parseOptions
) =>
  parseArgs({
    args,
    options,
    allowPositionals: true,
  })

const { values, positionals } = parse(process.argv.slice(2))

console.log('>> [VALUES]:', values)
console.log('>> [POSITIONALS]:', positionals)
