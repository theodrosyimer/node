import { fileURLToPath } from 'url'
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'

/**
 * @type {(script: any) => Promise<any>}
 */
// eslint-disable-next-line import/no-mutable-exports
export let parseAsync
if (isMainThread) {
  parseAsync = function (script) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(fileURLToPath(import.meta.url), {
        workerData: script,
      })
      worker.on('message', resolve)
      worker.on('error', reject)
      worker.on('exit', code => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`))
        }
      })
    })
  }
} else {
  // @ts-ignore
  const { parse } = import('some-other-parsing-library')
  const script = workerData
  parentPort?.postMessage(parse(script))
}
