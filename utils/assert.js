export function isNonNullable(value) {
  return value !== null && value !== undefined
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isObject(value) {
  return !Array.isArray(value) && typeof value === 'object' && value !== null
}

export function isFunction(value) {
  return typeof value === 'function'
}

export function isString(value) {
  return typeof value === 'string'
}

export function isNumber(value) {
  return typeof value === 'number'
}

export function isBoolean(value) {
  return typeof value === 'boolean'
}

export function isSymbol(value) {
  return typeof value === 'symbol'
}

export function isBigInt(value) {
  return typeof value === 'bigint'
}

export function isUndefined(value) {
  return value === undefined
}

export function isNull(value) {
  return value === null
}

export function isPrimitiveValue(value) {
  return (
    isString(value) ||
    isNumber(value) ||
    isBoolean(value) ||
    isSymbol(value) ||
    isBigInt(value) ||
    isUndefined(value) ||
    isNull(value)
  )
}

export function isReferenceValue(value) {
  return isObject(value) || isArray(value)
}
