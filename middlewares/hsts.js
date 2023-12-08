export function HSTSMiddleware(req, res, next) {
  if (req.secure) {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains' /* , 'preload' */
    ) // 2 years
  }
  next()
}
