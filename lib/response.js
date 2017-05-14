'use strict';

const OK = {code: 'OK'};
const NOT_FOUND = {code: 'NOT_FOUND'};
const BAD_REQUEST = {code: 'BAD_REQUEST'};
const INTERNAL_ERROR = {code: 'INTERNAL_ERROR'};

module.exports = {
  ok: function _ok (res, data) {
    res.status(200);
    if (data) {
      Object.assign(data, OK);
      res.json(data);
    } else {
      res.json(OK);
    }
  },
  notFound: function _notFound (res) {
    res.status(404).json(NOT_FOUND);
  },
  badRequest: function _badRequest (res, err) {
    let data = {};
    /* istanbul ignore else */
    if (err.name === 'ValidatorError') {
      data.reason = err.message.message;
    } else {
      data.reason = err;
    }
    Object.assign(data, BAD_REQUEST);
    res.status(400).json(data);
  },
  internalError: /* istanbul ignore next */ function _internalError (res) {
    res.status(500).json(INTERNAL_ERROR);
  }
};
