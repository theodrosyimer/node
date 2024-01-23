import { Router } from 'express'

export const router = Router()

router
  .all('/sales', (req, res) => {
    res.json({ ok: true })
  })
  .get('/orders', (req, res) => {
    res.json({ ok: true })
  })
  .post('/orders', (req, res) => {
    res.json({ ok: true })
  })
