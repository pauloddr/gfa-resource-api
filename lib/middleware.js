'use strict'

const Response = require('./response')

module.exports = function middleware (req, res, next) {
  _params(req, res)
  const validMethod = _method(req, res)
  /* istanbul ignore if */
  if (!validMethod) {
    return Response.notFound(res)
  }
  next(req, res)
}

function _params (req, res) {
  /* istanbul ignore if */
  if (!req.params) {
    return
  }
  let path = req.params['0']
  if (!path) {
    return
  }
  res.locals.parts = path.split('/')
  while (res.locals.parts[0] === '') {
    res.locals.parts.shift()
  }
  if (res.locals.parts.length === 0) {
    delete res.locals.parts
  }
}

function _method (req, res) {
  switch (req.method) {
    case 'POST':
      return _post(res)
    case 'PUT':
    case 'PATCH':
      return _put(res)
    case 'GET':
      return _get(res)
    case 'DELETE':
      return _delete(res)
  /* istanbul ignore next */
    default:
      return false
  }
}

function _post (res) {
  if (res.locals.parts) {
    return false
  }
  res.locals.action = 'create'
  return true
}

function _put (res) {
  if (!res.locals.parts) {
    return false
  }
  res.locals.action = 'update'
  res.locals.resourceId = res.locals.parts[0]
  return true
}

function _get (res) {
  if (!res.locals.parts) {
    res.locals.action = 'list'
    return true
  }
  let part = res.locals.parts[0]
  /* istanbul ignore else */
  if (part) {
    res.locals.action = 'find'
    res.locals.resourceId = part
    return true
  } else {
    return false
  }
}

function _delete (res) {
  if (!res.locals.parts) {
    return false
  }
  let part = res.locals.parts[0]
  res.locals.action = 'destroy'
  res.locals.resourceId = part
  return true
}
