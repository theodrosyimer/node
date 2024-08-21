import express, { type RequestHandler } from 'express'
import { z, ZodError } from 'zod'
import { type ParsedQs } from 'qs'

export const createApiHandler = <
  TQuery extends ParsedQs = any,
  TBody extends Record<string, any> = any,
  TParams extends Record<string, any> = any,
>(
  config: {
    query?: z.Schema<TQuery>
    params?: z.Schema<TParams>
    body?: z.Schema<TBody>
  },
  handler: RequestHandler<any, any, TBody, TQuery>,
): RequestHandler<any, any, TBody, TQuery> => {
  return (req, res, next) => {
    const { query, body } = req
    if (config.query) {
      try {
        config.query.parseAsync(query)
      } catch (e) {
        return res.status(400).send((e as ZodError).message)
      }
    }
    if (config.params) {
      try {
        config.params.parseAsync(req.params)
      } catch (e) {
        return res.status(400).send((e as ZodError).message)
      }
    }
    if (config.body) {
      try {
        config.body.parseAsync(body)
      } catch (e) {
        return res.status(400).send((e as ZodError).message)
      }
    }
    return handler(req, res, next)
  }
}
