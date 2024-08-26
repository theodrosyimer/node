import { buildSomething } from './shape-object-init.js'

const SomethingIsError = Symbol('SomethingIsError')

function SomethingBase(request, reply, log) {
  this.request = request
  this.reply = reply
  this.log = log
  this[SomethingIsError] = false
  return {}
}

SomethingBase.props = ['user', 'session']

const MySomething = buildSomething(SomethingBase)

const something = new MySomething('request', 'reply', 'log')
