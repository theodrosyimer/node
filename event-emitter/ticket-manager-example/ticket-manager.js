/* eslint-disable babel/no-invalid-this */
/* eslint-disable func-names */
import EventEmitter from 'node:events'

export class TicketManager extends EventEmitter {
  isSoldOut = () => this.supply === 0

  constructor(stock = 0) {
    super()
    this.#validateIsPositiveInteger(stock)
    this.supply = stock
  }

  placeOrder({ creditCard, email, price }) {
    if (this.supply > 0) {
      const transactionId = crypto.randomUUID()

      this.supply -= 1

      // emitting the 'placeOrder' event
      this.emit('placeOrder', {
        creditCard,
        email,
        price,
        transactionId,
        timestamp: Date.now(),
      })
      return
    }

    this.closeSales()
  }

  closeSales() {
    if (this.isSoldOut()) {
      this.emit('salesClosed', Date.now())
      // this.removeAllListeners() // where to put this? do i need this here?
    }
  }

  #validateIsPositiveInteger(n) {
    if (Number.isInteger(n) && n >= 0) {
      return true
    }
    // this emit an error that will be caught by subscribing to the 'error' event
    this.emit('error', new Error('The stock input must be a positive integer'))
  }
}
