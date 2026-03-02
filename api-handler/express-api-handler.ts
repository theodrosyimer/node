import express, { type NextFunction, type RequestHandler } from 'express'
import { z, ZodError } from 'zod'
import { type ParsedQs } from 'qs'

export const createApiHandler = <
  TQuery extends ParsedQs = any,
  TBody extends Record<string, any> = any,
  TParams extends Record<string, any> = any
>(
  config: {
    query?: z.Schema<TQuery>
    params?: z.Schema<TParams>
    body?: z.Schema<TBody>
  },
  handler: RequestHandler<any, any, TBody, TQuery>
): RequestHandler<any, any, TBody, TQuery> => {
  return (req, res, next?: NextFunction) => {
    const { query, body, params } = req
    try {
      if (config.query) {
        config.query.parse(query)
      }
      if (config.params) {
        config.params.parse(params)
      }
      if (config.body) {
        config.body.parse(body)
      }
    } catch (e) {
      return res.status(400).json({ status: 400, message: 'Bad request' })
    }
    return handler(req, res, next ?? (() => {}))
  }
}

const handler = createApiHandler(
  {
    query: z.object({
      name: z.string(),
    }),
  },
  (req, res) => {
    res.status(200).json({ status: 200, message: 'Hello, world!' })
  }
)

const router: express.Router = express.Router()

router.get('/', handler)

export default router
