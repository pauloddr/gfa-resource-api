'use strict';

const Response = require('./response');
const Resource = require('./resource');

module.exports = function list (req, res) {
  let options = {};
  let start = req.query.start;
  if (start) {
    options.start = start;
  }
  let limit = +(req.query.limit || 20);
  if (limit > 20 || limit < 1) {
    limit = 20;
  }
  options.limit = limit;
  Resource.list(options, (err, response) => {
    /* istanbul ignore if */
    if (err) {
      console.error('List Error:', err);
      Response.internalError(res);
      return;
    }
    Response.ok(res, {
      resources: response.entities,
      next: response.nextPageCursor,
      limit: limit
    });
  });
};
