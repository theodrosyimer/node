/*
From 'Deep dive into Undici - Matteo Collina, Node Congress 2024' (at 16:02)
*/
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { MockAgent, setGlobalDispatcher } from 'undici'

const mockAgent = new MockAgent()

setGlobalDispatcher(mockAgent)

const mockPool = mockAgent.get('http://127.0.0.1:3000')

mockPool
  .intercept({
    path: 'bank-transfer',
    method: 'POST',
    headers: {
      'X-TOKEN-SECRET': 'SuperSecretToken',
    },
    body: JSON.stringify({
      recipient: '123456789',
      amount: 1000,
    }),
  })
  .reply(200, {
    message: 'Transaction completed successfully',
  })

// write tests...
