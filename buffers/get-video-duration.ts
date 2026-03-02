/////////
// Inspired by: https://gist.github.com/Elements-/cf063254730cd754599e
/////////

import type { PathLike } from 'fs'
import { createReadStream } from 'fs'
import { pipeline } from 'stream/promises'

const BUFFER_SIZE = 100
// Define MVHD_HEADER as a Uint8Array directly with the correct bytes
// for proper type compatibility
const MVHD_HEADER = new Uint8Array([0x6d, 0x76, 0x68, 0x64]) // 'mvhd' in hex

async function* videoDurationGenerator(source: AsyncIterable<Buffer>) {
  let headerFound = false
  let timeScale: number | null = null
  let duration: number | null = null

  for await (const chunk of source) {
    if (headerFound) continue

    const mvhdIndex = chunk.indexOf(MVHD_HEADER)
    if (mvhdIndex !== -1) {
      headerFound = true
      const start = mvhdIndex + 16

      // Ensure we have enough data to read timeScale and duration
      if (chunk.length >= start + 8) {
        timeScale = chunk.readUInt32BE(start)
        duration = chunk.readUInt32BE(start + 4)

        const videoDuration = Math.floor((duration / timeScale) * 1000) / 1000
        yield { timeScale, duration, videoDuration }
        return // Exit the generator once we have the duration
      }
    }
  }

  throw new Error('Could not find MVHD header in video file')
}

export type VideoDuration = {
  timeScale: number
  duration: number
  videoDuration: number
}

export async function getVideoDuration(resource: PathLike) {
  try {
    const results: VideoDuration[] = []

    await pipeline(
      createReadStream(resource, { highWaterMark: BUFFER_SIZE }),
      async function* (source) {
        for await (const result of videoDurationGenerator(source)) {
          results.push(result)
          yield result
        }
      },
      async function* (source) {
        for await (const chunk of source) {
          console.log('[chunk]', chunk)
        }
      },
    )

    return results[0]
  } catch (error) {
    console.error('[getVideoDuration] Processing video error:', error)
    throw error
  }
}

getVideoDuration('./public/02._Prerequisites-1740370356466.mp4')
  .then(result => console.log('Video duration result:', result))
  .catch(error => console.error('Failed to get video duration:', error))
