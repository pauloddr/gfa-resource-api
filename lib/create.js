'use strict'

const Response = require('./response')
const Resource = require('./resource')

module.exports = function create (req, res) {
  delete req.body.id
  let resource = new Resource(Resource.sanitize(req.body))
  resource.save((err, entity) => {
    if (err) {
      return Response.unprocessableEntity(res, err)
    }
    Response.created(res, entity.plain())
  })
}
