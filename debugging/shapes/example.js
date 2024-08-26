/* eslint-disable */
const a = { foo: 'bar', bar: 'foo' }
const b = { foo: 'bar', bar: 'foo' }
const c = { bar: 'foo', foo: 'bar' }

console.log(%HaveSameMap(a, b))
console.log(%HaveSameMap(a, c))

b.answer = 42

console.log(%HaveSameMap(a, b))
