'use strict'

const cors = require('./cors')
const middleware = require('./middleware')
const route = require('./router')

module.exports = function manage (req, res) {
  cors(req, res, () => {
    middleware(req, res, () => {
      route(req, res)
    })
  })
}
