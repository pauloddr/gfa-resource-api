'use strict'

const Response = require('./response')
const Resource = require('./resource')
const config = require('./configuration')

module.exports = function list (req, res) {
  let options = {}
  let start = _start(req)
  if (start) {
    options.start = start
  }
  let limit = _limit(req)
  if (limit) {
    options.limit = limit
  }
  Resource.list(options, (err, response) => {
    /* istanbul ignore if */
    if (err) {
      console.error('List Error:', err)
      Response.internalError(res)
      return
    }
    if (response.nextPageCursor) {
      res.setHeader('X-Next-Page-Cursor', response.nextPageCursor)
    }
    if (limit) {
      res.setHeader('X-Page-Size', limit)
    }
    Response.ok(res, response.entities)
  })
}

function _start (req) {
  const query = req.query
  /* istanbul ignore if */
  if (!query) {
    return
  }
  return query.start || query.next || query.cursor || query._offset || query.offset
}

function _limit (req) {
  const query = req.query
  /* istanbul ignore if */
  if (!query) {
    return
  }
  let limit = query._perpage || query._perPage ||
              query.perpage || query.perPage ||
              query.limit || config.datastore.limit || 20
  limit = parseInt(limit, 10)
  /* istanbul ignore if */
  if (limit < 1) {
    limit = null
  }
  return limit
}
