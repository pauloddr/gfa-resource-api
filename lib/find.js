'use strict'

const Response = require('./response')
const Resource = require('./resource')

module.exports = function find (req, res) {
  const resourceId = res.locals.resourceId
  /* istanbul ignore if */
  if (!resourceId) {
    console.error('Routing Error: Find without ResourceId')
    return Response.internalError(res)
  }
  Resource.get(resourceId, (err, entity) => {
    /* istanbul ignore if */
    if (err) {
      if (err.code === 404) {
        return Response.notFound(res)
      }
      console.error('Find Resource error:', err)
      return Response.internalError(res)
    }
    Response.ok(res, entity.plain())
  })
}
