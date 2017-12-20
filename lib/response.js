'use strict'

const INTERNAL_ERROR = {code: 'INTERNAL_ERROR'}

const Response = {
  ok: function _ok (res, data) {
    res.status(200)
    /* istanbul ignore else */
    if (data) {
      res.json(data)
    } else {
      res.end()
    }
  },
  created: function _created (res, entity) {
    res.status(201).json(entity)
  },
  empty: function _empty (res) {
    res.setHeader('Content-Length', '0') // Safari bug
    res.status(204).end()
  },
  deleted: function _deleted (res) {
    Response.empty(res)
  },
  notFound: function _notFound (res) {
    res.setHeader('Content-Length', '0')
    res.status(404).end()
  },
  unprocessableEntity: function _unprocessableEntity (res, err) {
    let data = {}
    /* istanbul ignore else */
    if (err.name === 'ValidatorError') {
      data.error = err.message.message
    } else {
      data.error = err
    }
    res.status(422).json(data)
  },
  internalError: /* istanbul ignore next */ function _internalError (res) {
    res.status(500).json(INTERNAL_ERROR)
  }
}

module.exports = Response
