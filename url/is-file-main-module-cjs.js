export function isMainModuleCJS() {
  return require.main === module
}
