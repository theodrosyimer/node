import { TicketManager } from './ticket-manager-example/ticket-manager'

const USER_LANG = 'en-US'

const ticketManager = new TicketManager(0)

// register a listener callback function for the 'buy' event,
// we are subscribing to the event
ticketManager.on('buy', (email, price, timestamp) => {
  console.log(
    `Your payment was processed at ${new Intl.DateTimeFormat(USER_LANG, {
      dateStyle: 'medium',
      timeStyle: 'full',
      timeZone: 'America/Los_Angeles',
      // timeZone: 'Europe/Paris',
    }).format(timestamp)} ${timestamp}`,
  )
  console.log(`Your billing informations:\n${email} ${price} ${timestamp}\n`)
})

// it catches any error emitted by the TicketManager instance
// need to subscribe to `error` event as soon as possible
// or it will not be handled properly
// to see it in action, comment out the following line and run the example
ticketManager.on('error', err => {
  console.error(`There was an error processing your purchase: ${err.message}\n`)
})

// example of emitting the 'buy' event name directly
// but we need to know all the possible arguments
ticketManager.emit('buy', 'theo@example', '$99') // here date is missing

// by emitting directly, it is not obvious what the arguments are
// better to wrap it in a function with a set of known arguments
// example of **emitting** the 'buy' event name with a method attached to the class
// we could easily hover over the method to see what arguments it takes
ticketManager.placeOrder('theo@example.com', '$99')

ticketManager.emit('error', new Error('Whoops!'))

// this one is too late,
// the error event has already been emitted
ticketManager.on('error', err => {
  console.error(
    `\nThere was an error processing your purchase: ${err.message}\n`,
  )
})

console.log(ticketManager)
console.log()
console.log(`ticketManager.supply:\n${ticketManager.supply}\n`)

// console.log(`on:\n${ticketManager.on('buy')}\n`)
// console.log(`once:\n${ticketManager.once('buy')}\n`)
// console.log(`emit:\n${ticketManager.emit('buy')}\n`)
// console.log(`off:\n${ticketManager.off('buy')}\n`)
// console.log(`eventNames():\n${ticketManager.eventNames()}\n`)
// console.log(`addListener:\n${ticketManager.addListener('buy')}\n`)
// console.log(`removeListener:\n${ticketManager.removeListener('buy')}\n`)
// console.log(`removeAllListeners:\n${ticketManager.removeAllListeners()}\n`)
// console.log(`listenerCount:\n${ticketManager.listenerCount('buy')}\n`)
// console.log(`listeners:\n${ticketManager.listeners('buy')}\n`)
// console.log(`rawListeners:\n${ticketManager.rawListeners('buy')}\n`)
// console.log(`getMaxListeners():\n${ticketManager.getMaxListeners()}\n`)
// console.log(`setMaxListeners:\n${ticketManager.setMaxListeners(2)}\n`)
// console.log(`prependListener:\n${ticketManager.prependListener('buy')}\n`)
// console.log(`prependOnceListener:\n${ticketManager.prependOnceListener('buy')}\n`)

ticketManager.placeOrder('theo@example.com', '$99')
console.log(`ticketManager.supply:\n${ticketManager.supply}\n`)
