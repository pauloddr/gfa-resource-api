'use strict'

const Schema = require('./schema')

const defaults = require('../config/defaults')
const cors = require('./middlewares/cors')
const locals = require('./middlewares/locals')

class Handler {
  constructor (configuration) {
    this.configure(configuration)
    this.use(cors.bind(this))
    this.use(locals)
    this.schema = new Schema(this)
  }

  configure (configuration) {
    this.configuration = JSON.parse(JSON.stringify(defaults)) // deep clone
    Object.assign(this.configuration, configuration)
  }

  use (middleware) {
    if (!this.middlewares) {
      this.middlewares = []
    }
    this.middlewares.push(middleware)
  }
}

module.exports = Handler
