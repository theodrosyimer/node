/* eslint-disable max-classes-per-file */

/* eslint-disable max-classes-per-file */
class DbServiceError extends Error {
  constructor(payload) {
    super(payload)
    this.name = 'DbServiceError'
    this.payload = payload
  }
}

export class DbService {
  data = []

  #id = 0

  save({ email, price, timestamp, transactionId }) {
    console.log(`Saving ticket sale to the database...`)
    console.log()
    this.data.push({
      id: this.#generateNextId(),
      email,
      price,
      timestamp,
      transactionId,
    })
  }

  static getAll() {
    return this.data
  }

  #generateNextId() {
    function* genId(thisInstance) {
      while (true) {
        yield thisInstance.#id++
      }
    }
    return genId(this).next().value
  }

  getById(id) {
    const foundItem = this.data.find(item => item.id === id)
    if (!foundItem) {
      throw new Error(`Item with id: ${id} not found`)
    }
    return foundItem
  }
}
