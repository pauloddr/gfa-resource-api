'use strict'

const Response = require('./response')
const Resource = require('./resource')

module.exports = function update (req, res) {
  let resourceId = res.locals.resourceId
  Resource.update(resourceId, Resource.sanitize(req.body), (err, entity) => {
    if (err) {
      return Response.unprocessableEntity(res, err)
    }
    Response.ok(res, entity.plain())
  })
}
