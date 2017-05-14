'use strict';

const middleware = require('./middleware');
const Response = require('./response');
const route = require('./router');

module.exports = function manage (req, res) {
  middleware(req, res, () => {
    if (req.method === 'OPTIONS') {
      return Response.ok(res);
    }
    route(req, res);
  });
};
