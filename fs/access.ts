// To check if a file exists without manipulating it afterwards, `fs.access()` is recommended.

// Do not use `fs.access()` to check for the accessibility of a file before calling `fs.open()`, `fs.readFile()`, or `fs.writeFile()`. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file is not accessible.

// Tests a user's permissions for the file or directory specified by `path`. The `mode` argument is an optional integer that specifies the accessibility checks to be performed. `mode` should be either the value `fs.constants.F_OK` or a mask consisting of the bitwise OR of any of `fs.constants.R_OK`, `fs.constants.W_OK`, and `fs.constants.X_OK` (e.g. `fs.constants.W_OK | fs.constants.R_OK`). Check File access constants for possible values of `mode`.

import { access, constants } from 'node:fs/promises'

const file = 'access.test.json'

try {
  // Check if the file exists in the current directory.
  await access(file, constants.F_OK)
  console.log('can access')
} catch (err) {
  console.error(`${file} does not exist`)
}

try {
  // Check if the file is readable.
  await access(file, constants.R_OK)
  console.log('can access')
} catch (err) {
  console.error(`${file} is not readable`)
}

try {
  // Check if the file is writable.
  await access(file, constants.W_OK)
  console.log('can access')
} catch (err) {
  console.error(`${file} is not writable`)
}

try {
  // Check if the file is readable and writable.
  await access(file, constants.R_OK | constants.W_OK)
  console.log('can access')
} catch (err) {
  console.error(`${file} is not readable and writable`)
}
