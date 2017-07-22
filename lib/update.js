'use strict'

const Response = require('./response')
const Resource = require('./resource')

module.exports = function update (req, res) {
  let resourceId = req.params.resourceId
  Resource.update(resourceId, Resource.sanitize(req.body), (err, entity) => {
    if (err) {
      return Response.badRequest(res, err)
    }
    Response.ok(res, {resource: entity.plain()})
  })
}
