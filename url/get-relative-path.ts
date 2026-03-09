function getRelativePath(url: URL | string) {
  if (isRelative(url)) return url
  if (!URL.canParse(url))
    throw new Error(`Expected a string or URL, received ${url}`)

  let urlObject: string | URL

  if (typeof url === 'string') urlObject = new URL(url)
  else urlObject = url

  const { pathname = '', search = '', hash = '' } = urlObject
  console.log(`search: ${search}`)
  console.log(`searchParams: ${urlObject.searchParams}`)
  console.log(`hash: ${hash}`)
  // When a hash is not empty it will contain `search` value and `search` itself will be empty
  return pathname + search + hash
}

// function isValidInput(input: unknown) {
//   if (input instanceof URL || typeof input === 'string') return true
//   return false
// }

function isRelative(input: unknown) {
  const reg = /^(\/.+)+(\#.+)?(\?.+=.+)?/
  if (typeof input !== 'string') return false
  return reg.test(input)
}

console.log('isRelative:', isRelative('/path/to/something#header1'))
console.log(
  'isRelative:',
  isRelative('/path/to/something#header1?active=true?another=false'),
)
console.log(
  'isRelative:',
  isRelative(
    'https://test.com/path/to/something#header1?active=true?another=false',
  ),
)

getRelativePath('/path/to/something#header1')

getRelativePath(
  'https://test.com/path/to/something#header1?active=true?another=false',
)

getRelativePath(
  new URL('https://test.com/path/to/something?active=true?another=false'),
)
// getRelativePath(null)
// getRelativePath(undefined)
