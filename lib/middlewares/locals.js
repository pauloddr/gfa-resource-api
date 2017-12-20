'use strict'

// Load stuff into res.locals.
function locals (req, res, next) {
  path(req, res)
  method(req, res, next)
}

// Parse url path and load values
//   into res.locals.path as an array
function path (req, res) {
  /* istanbul ignore if */
  if (!req.params) {
    return
  }
  let path = req.params['0']
  if (!path) {
    return
  }
  res.locals.path = path.split('/')
  while (res.locals.path[0] === '') {
    res.locals.path.shift()
  }
}

function method (req, res, next) {
  switch (req.method) {
    case 'POST':
      return post(req, res, next)
    case 'PUT':
      return put(req, res, next)
    case 'PATCH':
      return patch(req, res, next)
    case 'GET':
      return _get(req, res, next)
    case 'DELETE':
      return _delete(req, res, next)
    default:
      return next(req, res)
  }
}

function post (req, res, next) {
  if (res.locals.path.length === 0) {
    // POST /tasks (no path)
    res.locals.action = 'create'
  }
  next(req, res)
}

function put (req, res, next) {
  if (res.locals.path.length > 0) {
    // PUT /tasks/1
    res.locals.action = 'update'
    res.locals.resourceId = res.locals.path[0]
  }
  next(req, res)
}

function patch (req, res, next) {
  put(req, res, next)
}

function _get (req, res, next) {
  if (res.locals.path.length === 0) {
    // GET /tasks
    res.locals.action = 'list'
  } else {
    // GET /tasks/1
    res.locals.action = 'show'
    res.locals.resourceId = res.locals.path[0]
  }
  next(req, res)
}

function _delete (req, res, next) {
  if (res.locals.path.length > 0) {
    // DELETE /tasks/1
    res.locals.action = 'destroy'
    res.locals.resourceId = res.locals.path[0]
  }
  next(req, res)
}

module.exports = locals
