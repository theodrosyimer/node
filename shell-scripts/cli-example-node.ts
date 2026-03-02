#!/usr/bin/env node

type Args = {
  [key: string]: string
}

let args: Args = {
  name: 'John',
  age: '20',
}

console.log('args:', args)
