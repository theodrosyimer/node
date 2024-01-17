export function isMainModuleCJS() {
    if (require.main === module) {
      return true
    }
  return false
}
