import { z, type ZodTypeAny } from 'zod'

export const emailSchema = {
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
}

export const emailIsOptionalSchema = {
  email: z.string().email({ message: 'Invalid email address' }).optional(),
}

export const usernameSchema = {
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
}

export const validatePasswordSchema = {
  password: z
    .string({ required_error: 'Password is required' })
    .min(12)
    .max(25)
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,}$/g,
      {
        message:
          'Password must contain at least 12 characters, one uppercase, one lowercase, one number and one of these special characters: #?!@$ %^&*-',
      },
    ),
}

// export const validateBirthdateSchema = {
//   birthdate: z.coerce
//     .date({ required_error: 'Birthdate is required' })
//     .refine(
//       (birthdate) =>
//         new Date().getFullYear() - new Date(birthdate).getFullYear() > 13,
//       {
//         message: 'User must be above 13 years old.',
//       },
//     ),
// }

export const confirmPasswordSchema = {
  confirmPassword: z.string({ required_error: 'Confirm your password' }),
}

export const createdAtToDateSchema = {
  createdAt: z.coerce.date(),
}

export const updatedAtToDateSchema = {
  updatedAt: z.coerce.date(),
}

export const roleSchema = {
  role: z.enum(['user', 'admin']),
}

export type AllRefinedFields = typeof allRefinedFieldsDefault

export type RefinedFieldKey = keyof AllRefinedFields

export const allRefinedFieldsDefault = {
  ...emailSchema,
  ...emailIsOptionalSchema,
  ...usernameSchema,
  ...roleSchema,
  ...createdAtToDateSchema,
  ...updatedAtToDateSchema,
  // ...validateBirthdateSchema,
  ...validatePasswordSchema,
  ...confirmPasswordSchema,
} as const

export const userDateFieldsSchema = {
  ...createdAtToDateSchema,
  ...updatedAtToDateSchema,
}

export const selectUserRefinedFieldsDefault = {
  ...userDateFieldsSchema,
}

export const createUserRefinedFieldsDefault = {
  // ...usernameFieldSchema,
  ...emailSchema,
  ...validatePasswordSchema,
  ...roleSchema,
}

export const globalRefinedFieldsDefault = {}

export class ApiSchemaBuilder {
  schema = {}
  fields = new Set<RefinedFieldKey>()

  constructor() {
    return this
  }

  build() {
    this.schema = this.generateSchemaFromList([...this.fields])
    return this.schema
  }

  add(fields: Array<Exclude<RefinedFieldKey, typeof this.fields>>) {
    for (const field of fields) {
      this.fields.add(field)
    }
    return this
  }

  generateSchemaFromList(fields: RefinedFieldKey[]) {
    return fields.reduce(
      (obj, field: RefinedFieldKey) => {
        for (const [key, value] of Object.entries(allRefinedFieldsDefault)) {
          if (key === field) {
            obj[key] = value
          }
        }

        return obj
      },
      {} as Record<RefinedFieldKey, ZodTypeAny>,
    )
  }
}

const apiSchemaBuilder = new ApiSchemaBuilder()
// export default new ApiSchemaBuilder()

const schema = apiSchemaBuilder.add(['password']).build()

console.log(schema)
