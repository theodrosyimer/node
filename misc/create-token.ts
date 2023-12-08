import { randomBytes, type Encoding, } from 'crypto'

type BytesValue = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024

export function createToken(bytes: BytesValue, encoding: Encoding = 'base64url') {
  return randomBytes(32).toString('base64url')
}

createToken(32, 'utf-8')
