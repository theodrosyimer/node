/* eslint-disable max-classes-per-file */
import EventEmitter from 'events'

class PaymentServiceError extends Error {
  constructor(payload) {
    super(payload)
    this.name = 'EmailServiceError'
    this.payload = payload
  }
}

export class PaymentService extends EventEmitter {
  constructor() {
    super()
    this.payments = []
  }

  async charge({ creditCard, transactionId, price }) {
    console.log('Charging credit card...')
    // to test error handling, uncomment the following condition block
    if (Math.random() > 0.5) {
      this.emit(
        'error',
        new PaymentServiceError(`Transaction ID: ${transactionId}`),
      )
      return false
    }
    this.payments.push({ creditCard, price, transactionId })
    console.log(`Credit card charged for ${price}`)
    this.emit('charged', { creditCard, price, transactionId })
    return true
  }
}

export const paymentService = new PaymentService()

paymentService.on('error', onError)

function onError(error) {
  console.error(`There was an error processing the payment: ${error.message}`)
}
