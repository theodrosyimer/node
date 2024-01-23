/* eslint-disable func-names */
/* eslint-disable babel/no-invalid-this */
import { EventEmitter } from 'node:events'

// Simplicity (1) vs Encapsulation (2)
// FP (1) vs OOP (2)
// Generic Events (1) vs Reusability (2)

// Two ways of using it:

// 1. Using the EventEmitter class directly:
const PaymentManager = new EventEmitter()

// subscribing to the 'event' event
PaymentManager.on('event', function (a, b) {
  console.log(a, b, this)
  console.log(`this === PaymentManager: ${this === PaymentManager}`) // true
})

// 2. Using a class that extends EventEmitter:
class MyEmitter extends EventEmitter {
  count = 0
}

const myEmitter = new MyEmitter()

// subscribing to the 'test' event
// by using the 'function' keyword, 'this' will be bound to the instance of MyEmitter
// unlike when using arrow functions where 'this' will be bound to the global object
// and 'this' will be undefined
myEmitter.on('test', function (a, b) {
  console.log(a, b, `this.count: ${this.count}`)
  console.log(this)
  console.log(`this === myEmitter: ${this === myEmitter}`) // true
  this.count++
})

myEmitter.emit('test', 'a', 'b')
myEmitter.emit('test', 'a', 'b')
myEmitter.emit('test', 'a', 'b')
