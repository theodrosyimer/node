/**
 * A typeguarded version of `instanceof Error` for NodeJS.
 * @author Joseph JDBar Barron
 * @link https://dev.to/jdbar/the-problem-with-handling-node-js-errors-in-typescript-and-the-workaround-m64
 */
export function instanceOfNodeError<T extends new (...args: any) => Error>(
  value: Error,
  errorType: T
): value is InstanceType<T> & NodeJS.ErrnoException {
  return value instanceof errorType;
}
