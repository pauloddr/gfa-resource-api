'use strict'

const config = require('./configuration')

module.exports = function _cors (req, res, next) {
  let keys = Object.keys(config.cors)
  for (let key of keys) {
    res.setHeader(key, config.cors[key])
  }
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next(req, res)
}
