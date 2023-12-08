// To check if a file exists without manipulating it afterwards, `fs.access()` is recommended.

// Do not use `fs.access()` to check for the accessibility of a file before calling `fs.open()`, `fs.readFile()`, or `fs.writeFile()`. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file is not accessible.

// Tests a user's permissions for the file or directory specified by `path`. The `mode` argument is an optional integer that specifies the accessibility checks to be performed. `mode` should be either the value `fs.constants.F_OK` or a mask consisting of the bitwise OR of any of `fs.constants.R_OK`, `fs.constants.W_OK`, and `fs.constants.X_OK` (e.g. `fs.constants.W_OK | fs.constants.R_OK`). Check File access constants for possible values of `mode`.

import { access, constants } from 'node:fs/promises'

try {
  // Check if the file exists in the current directory and if it is readable and writable by the current user.
  await access('/etc/passwd', constants.R_OK | constants.W_OK)
  console.log('can access')
} catch {
  console.error('cannot access')
}

///////////////////////////////////////////////////////////////////////

import { access, constants } from 'node:fs'

const file = 'package.json'

// Check if the file exists in the current directory.
access(file, constants.F_OK, err => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`)
})

// Check if the file is readable.
access(file, constants.R_OK, err => {
  console.log(`${file} ${err ? 'is not readable' : 'is readable'}`)
})

// Check if the file is writable.
access(file, constants.W_OK, err => {
  console.log(`${file} ${err ? 'is not writable' : 'is writable'}`)
})

// Check if the file is readable and writable.
access(file, constants.R_OK | constants.W_OK, err => {
  console.log(`${file} ${err ? 'is not' : 'is'} readable and writable`)
})

///////////////////////////////////////////////////////////////////////
