import { type Request } from 'express'
import { z, type AnyZodObject, type ZodTypeAny } from 'zod'

export interface TypedRequest<T extends ZodTypeAny>
  extends Record<string, T>,
    RequestBody<T>,
    RequestQuery<T>,
    RequestParams<T> {
  [key: string]: z.infer<T>
}

export type RequestBody<T extends ZodTypeAny> = {
  body: z.infer<T>
}

export type RequestQuery<T extends ZodTypeAny> = {
  query: z.infer<T>
}

export type RequestParams<T extends ZodTypeAny> = {
  params: z.infer<T>
}

export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: Request,
): Promise<z.infer<T>> {
  return schema.parseAsync(req)
}

export type RequestProps =
  | keyof RequestBody<any>
  | keyof RequestQuery<any>
  | keyof RequestParams<any>

export function generateSchemaObjectFromList<
  T extends Record<string, ZodTypeAny>,
>(schemaObjects: T[], key: RequestProps) {
  const schemaObject = schemaObjects.reduce((obj, schemaObject: T) => {
    for (const [key, value] of Object.entries(schemaObject) as [keyof T, any]) {
      obj[key as keyof T] = value
    }

    return obj
  }, {} as T)

  const schemaDefault = {
    body: z.object({} as const),
    query: z.object({} as const),
    params: z.object({} as const),
  }
  // if (key === 'body') {
  //   return { [key]: z.object({ ...schema } as const) } as const
  // } else if (key === 'query') {
  //   return { [key]: z.object({ ...schema } as const) } as const
  // } else if (key === 'params') {
  //   return { [key]: z.object({ ...schema } as const) } as const
  // } else {
  //   return { [key]: z.object({ ...schema } as const) } as const
  // }

  return {
    body: z.object({ ...schemaObject } as const),
    query: z.object({ ...schemaObject } as const),
    params: z.object({ ...schemaObject } as const),
    ...{ [key]: z.object({ ...schemaObject } as const) },
  } as const
}

export const emailFieldSchema = {
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
}

const requestSchema = generateSchemaObjectFromList([emailFieldSchema], 'body')

requestSchema.body
requestSchema.query
requestSchema

// export function generateRequestBodySchema<T extends ZodTypeAny>(
//   schema: T,
// ): RequestBody<T> {
//   return {
//     body: schema as z.infer<T>,
//   }
// }

// export function generateRequestQuerySchema<T extends ZodTypeAny>(
//   schema: T,
// ): RequestQuery<T> {
//   return {
//     query: schema as z.infer<T>,
//   }
// }

// export function generateRequestParamsSchema<T extends ZodTypeAny>(
//   schema: T,
// ): RequestParams<T> {
//   return {
//     params: schema as z.infer<T>,
//   }
// }
