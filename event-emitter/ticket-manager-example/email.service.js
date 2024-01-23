/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */

import EventEmitter from 'events'
import { red } from 'kleur/colors'

class EmailServiceError extends Error {
  constructor(payload) {
    super(payload)
    this.name = 'EmailServiceError'
    this.payload = payload
  }
}

class EmailService extends EventEmitter {
  constructor() {
    super()
    this.emails = []
  }

  async send({ email, message, transactionId }) {
    console.log('Sending email...')
    // to test error handling, uncomment the following condition block
    if (Math.random() > 0.5) {
      this.emit(
        'error',
        new EmailServiceError(`Transaction ID: ${transactionId}`),
      )
      // TODO: retry sending the email until this is succesfully done then emit an event to notify the workflow process that the email could not be sent so that the next step in the workflow can be managed properly (e.g. send a notification to the user that the email could not be sent + a link to retry sending the email + log the error somewhere so that it can be investigated later)
      return false
    }
    this.emails.push({ email, message, transactionId })
    console.log(`Email sent to ${email} with message: ${message}`)
    this.emit('emailSent', { email, message, transactionId })
    return true
  }

  // // how to make the error event for a particular event name
  // emit(eventName, payload) {
  //   if (eventName === 'error') {
  //     console.error(payload)
  //     this.emit('error', new EmailServiceError(payload))
  //   }
  // }
}

export const emailService = new EmailService()

emailService.on('error', onError)

function onError(error) {
  red(
    `There was an error while sending the email confirmation: ${error.message}`,
  )
}
