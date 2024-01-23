class OrderPlaced {
  orderId

  constructor(order) {
    this.order = order
    this.orderId = crypto.randomUUID()
  }

  get id() {
    return this.orderId
  }

  get transactionId() {
    return this.order.transactionId
  }
}
