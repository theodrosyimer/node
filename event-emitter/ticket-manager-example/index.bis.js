/* eslint-disable no-unused-vars */
import { DbService } from './db.service.js'
import { EmailService } from './email.service.js'
import { TicketManager } from './ticket-manager.js'

const ticketManager = new TicketManager(2)
const emailService = new EmailService()
const db = new DbService()

ticketManager.on('error', err => {
  console.error(`There was an error processing your purchase: ${err.message}\n`)
})

// differences with `index.js` -> subscribing each service one by one

// subscribing to the 'buy' event
ticketManager.on('buy', (email, price, timestamp) => {
  if (Math.random() > 0.5) {
    ticketManager.emit('error', new Error('Email was not sent.'))
    return
  }
  emailService.send(
    email,
    `Your invoice for ${price} was created at ${timestamp}`,
  )
})

// subscribing to the 'buy' event
ticketManager.on('buy', (email, price, timestamp) => {
  if (Math.random() > 0.5) {
    ticketManager.emit('error', new Error('Whoops!'))
    return
  }
  db.save({ email, price, timestamp })
  console.log('Data saved:', db.data)
  console.log(`\n${'-'.repeat(80)}\n`)
})

// emitting the 'buy' event
ticketManager.buy('test1@example.com', '$99')
ticketManager.buy('test2@example.com', '$59')

ticketManager.buy('test3@example.com', '$129')
