// const func1 = () => {
//   return new Promise((resolve, reject) => {
//     setImmediate(() => {
//       throw new Error('func1')
//     })
//   })
// }

/**
 * This error will be swallowed because an error thrown asynchronously won’t be caught
 */
// const main1 = async () => {
//   try {
//     await func1()
//   } catch (ex) {
//     console.log('will not execute')
//   }
// }

// main1()

const func2 = () => {
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      reject('func2')
    })
  })
}

/**
 * This error will be logged as reject is used here instead of throw
 */
const main2 = async () => {
  try {
    await func2()
  } catch (ex) {
    console.log('but this will execute')
  }
}

main2()

// const func3 = () => {
//   return new Promise((resolve, reject) => {
//     setImmediate(() => {
//       reject('func3')
//     })
//   })
// }

// const main3 = async () => {
//   try {
//     await func3()
//   } catch (ex) {
//     console.log('but this will execute')
//     throw ex
//   }
// }

// main3().catch((e) => console.error(e))
