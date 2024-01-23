/* eslint-disable func-names */
/* eslint-disable babel/no-invalid-this */
import { EventEmitter } from 'node:events'

// For explanation, see the comments in `basics.js` and `explanation.js`
class PaymentService extends EventEmitter {}

const paymentService = new PaymentService()

// multiple listeners/subscribers for the same event
paymentService.on('foo', () => {
  console.log('Event: foo, Listener: 1')
})

paymentService.on('foo', () => {
  console.log('Event: foo, Listener: 2')
})

paymentService.on('foo', x => {
  console.log('Event: foo, Listener: 3', x)
})

paymentService.on('error', err => {
  console.error(`There was an error processing your payment: ${err.message}`)
})

// emitting the 'foo' event with and without arguments to show the difference
paymentService.emit('foo')
paymentService.emit('foo', 'arg1')

// all listeners/subscribers will be called synchronously
// in the order they were added

// emitting the 'error' event
paymentService.emit('error', new Error('Card declined'))
