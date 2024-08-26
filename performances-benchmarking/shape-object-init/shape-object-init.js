/* eslint-disable babel/no-invalid-this */

const SomethingIsError = Symbol('SomethingIsError')
/**
 * @function buildSomething
 * @classdesc
 * Function that takes an object with a props property and returns a new
 * function that creates an object with the same properties as the original
 * object, but with all properties set to null.
 *
 * @param {Object} S - The object with a props property
 * @return {FunctionConstructor} A new function that creates an object with the same
 * properties as InitObj, but with all properties set to null, this way the object returned is always initialized with the same properties, in the same order for better performance (v8 shapes).
 */
export function buildSomething(S) {
  const props = [...S.props]

  /**
   * @constructor _Something
   * @classdesc
   * Function that creates an object with the same properties as the original
   * object, but with all properties set to null.
   *
   * @param {Request} request - The request object
   * @param {Reply} reply - The reply object
   * @param {Logger} log - The logger object
   * @return {Object} An object with the same properties as the original object,
   * but with all properties set to null, this way the object returned is always
   * initialized with the same properties, in the same order for better
   * performance (v8 shapes).
   */
  function _Something(request, reply, log) {
    this.request = request
    this.reply = reply
    this.log = log
    this[SomethingIsError] = false

    for (let i = 0; i < props.length; i++) {
      this[props[i]] = null
    }
  }
  _Something.prototype = new S()
  _Something.props = props
  return _Something
}
