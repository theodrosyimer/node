/* eslint-disable no-unused-vars */
import { addLogDelimitation } from 'utils/inspect.js'

import { DbService } from './db.service.js'
import { emailService } from './email.service.js'
import { paymentService } from './payment.service.js'
import { TicketManager } from './ticket-manager.js'

const ticketManager = new TicketManager(2)

ticketManager.on('error', onError)

function onError(error) {
  console.error(`There was an error processing your order: ${error.message}\n`)
}

// const paymentService = new paymentService()
// const emailService = new _emailService()
const db = new DbService()

// subscribing to the 'placeOrder' event
ticketManager.on(
  'placeOrder',
  ({ creditCard, email, price, transactionId, timestamp }) => {
    paymentService.charge({ creditCard, transactionId, price })
    emailService.send({
      email,
      transactionId,
      message: `Your invoice for ${price} was created at ${new Intl.DateTimeFormat(
        'en-US',
        {
          dateStyle: 'full',
          timeStyle: 'full',
          timeZone: 'America/Los_Angeles',
          // timeZone: 'Europe/Paris',
        },
      ).format(Date.now())}`,
    })
    db.save({ email, price, timestamp, transactionId })
    console.log('Data saved:', db.data)
    addLogDelimitation()
  },
)

// need to subscribe to the 'salesClosed' event
// before emitting those events to avoid missing them
ticketManager.on('salesClosed', timestamp => {
  console.info(
    `Sorry. All tickets have been sold. But we'll have more for sale very soon!`,
  )
  addLogDelimitation()
})

// emitting the 'placeOrder' event
ticketManager.placeOrder({
  creditCard: '123456789',
  email: 'test1@example.com',
  price: '$19',
})
ticketManager.placeOrder({
  creditCard: '123456789',
  email: 'test2@example.com',
  price: '$29',
})
ticketManager.placeOrder({
  creditCard: '123456789',
  email: 'test3@example.com',
  price: '$39',
})
ticketManager.placeOrder({
  creditCard: '123456789',
  email: 'test4@example.com',
  price: '$49',
})

// uncomment the following line to test error handling
// in the case of no more tickets available
// ticketManager.placeOrder('test3@example.com', '$129')
