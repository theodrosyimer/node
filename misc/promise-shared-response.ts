import { scheduler } from 'timers/promises'

let count = 0

async function maybeThrow(){
  await scheduler.wait(1000)
  if (Math.random() > 0.5) {
    throw new Error('Rejected')
  }
  return `Fulfilled ${count++}`
}

let p = await maybeThrow()
console.log(p)
console.log(p)
console.log(p)
