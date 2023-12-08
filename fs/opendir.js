import { opendir } from 'node:fs/promises'

// When using the async iterator, the <fs.Dir> object will be automatically closed after the iterator exits.
// If an error occurs while iterating, or when calling <fs.Dir#close()>, the directory will be closed automatically.

try {
  const dir = await opendir('./')

  // Entries returned by the async iterator are always an <fs.Dirent>. The `null` case from `dir.read()` is handled internally.
  for await (const dirent of dir) {
    console.log(dirent.name)
  }
} catch (err) {
  console.error(err)
}
