import { parseEnv } from 'node:util'

// .env
const dotenvFileContent = 'HELLO=world\nHELLO=oh my\n'
parseEnv(dotenvFileContent)
// Returns: { HELLO: 'oh my' }
