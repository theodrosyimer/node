/* eslint-disable import/no-extraneous-dependencies */

import jwt from 'jsonwebtoken'

export function tokenService(req, res) {
  const isBodyEmpty = !Object.values(req.body).length

  if (isBodyEmpty) {
    return res.status(400).json({ error: 'No data was given!' })
  }

  const { lastname, firstname, email, role } = req.body

  const accessToken = jwt.sign(
    {
      lastname,
      firstname,
      email,
      role,
    },
    process.env.JWT_SECRET,
  )

  res.json({ accessToken })
}
