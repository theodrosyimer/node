import { parseEnv } from 'node:util'

// .env
const dotenvFileContent = 'HELLO=world\nHELLO=oh my\n'
const parsedEnv = parseEnv(dotenvFileContent)
console.log('>> [parsedEnv]:', parsedEnv)
// Returns: { HELLO: 'oh my' }
