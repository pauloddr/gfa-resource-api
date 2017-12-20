'use strict'

function cors (req, res, next) {
  // this == Handler instance
  var config = this.configuration.cors
  var keys = Object.keys(config)
  for (var key of keys) {
    setHeader(res, key, config)
  }
  if (req.method === 'OPTIONS') {
    return Response.empty(res)
  }
  next(req, res)
}

function setHeader (res, header, config) {
  res.setHeader(header, config[header])
}

module.exports = cors
