import { z } from 'zod'

// based on an example from Matt Pocock's post on LinkedIn
// ts playground: https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgLzgXzgMyhEcBEyEAJvgNwBQFAxhAHYDO8IAngIIDuApg7lwGJ04AXjgAeACoBlagAsuIAIZwuADxhc6xBigB0M+UoB8ACgpw4DOQsUAuONOtKANObizFWgDZd7J4HRgAK4w9si6ECHBMJIGNkYAlCJGcABuEMDEFEnCKQhuUFwwQVBC-oEh9kF0ANZ0EBx0OSke3lwmVoaKumCKUAztAdEJCZRolDT0TJZOyqLhEABGAFZc1DAm+RaZYbpMUAEA5iYJrhZ0iiC+evtHJ65oo1SsnDx8gh2zznDlw8mIblojAgPl0XggxyGISeFgA9LCLIikXAAHoAfgoj0oQA

/**
 * This function is a generic validator that takes a schema and a function to handle the input
 *
 * @param schema the schema to validate the input against
 * @param handle the function to handle the input if it is valid
 * @returns a function that takes an input and validates it against the schema and then calls the `handle` function on the input with the type inferred from the function return type
 * @throws if the input is not valid the `handle` function will throw a ZodError
 * @example
 * ```ts
 * const userSchema = z.object({
 *  id: z.string(),
 * name: z.string(),
 * })
 *
 * type User = z.infer<typeof userSchema>
 *
 * const validateUser = createValidator(userSchema, (input) => {
 * console.log(input)
 * // do whatever you want with the input
 * // ...
 * return input
 * })
 *
 * // imagine this data is coming from a request
 * // this will fail because the data is not valid
 * const data: User = {
 * id: 1, // should be a string
 * name: 'John',
 * }
 *
 * // usage example
 * function example1(data) {
 *   try {
 *     const user = validateUser(data)
 *     // do something with the data
 *     // ...
 *     return user
 *   } catch (error) {
 *     if (error instanceof z.ZodError) {
 *       console.log(error.issues)
 *       // do something with the error
 *       // ...
 *       return error // or throw new Error("...") or throw error
 *     } else {
 *       console.error(error)
 *       // do something with the error
 *       // ...
 *       return error // or throw new Error("...") or throw error
 *     }
 *   }
 * }
 * ```
 */
function createValidator<
  TSchema extends z.Schema,
  HandlerFn extends (input: z.output<TSchema>) => any,
  R extends ReturnType<HandlerFn>,
>(schema: TSchema, handle: HandlerFn) {
  return (input: unknown): R => handle(schema.parse(input))
}

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
})

// Using createValidator

// input is inferred from the schema
const validateUser = createValidator(userSchema, input => {
  // do whatever you want with the input
  console.log(input)
  //          ^?

  return input
})

// inferred type from the schema
type User = z.infer<typeof userSchema>

// imagine this data is coming from a request
const data1 = {
  // @ts-expect-error because `id` should be a string
  id: 1,
  name: 'John',
} satisfies User

const data2 = {
  id: '1',
  name: 'John',
} satisfies User

// this will fail because the data is not valid
// so i need to try/catch it when calling it
// in order to prevent breaking the app
// better to handle higher up the call stack to avoid try/catch everywhere in the code and centralize handling of errors
// maybe add annotation (see annotation for `createValidator` above) to the function to indicate that it throws and what the error type is to better communicate the error to the caller of the function
function example1(data: unknown) {
  try {
    const user = validateUser(data)
    // do something with the data
    // ...
    return user
  } catch (error) {
    if (error instanceof z.ZodError) {
      // console.log(error.issues)
      // do something with the error
      // ...
      return error // or throw new Error("..."); or throw error
    } else {
      // console.error(error)
      // do something with the error
      // ...
      return error // or throw new Error("..."); or throw error
    }
  }
}

example1(data1)
example1(data2)
