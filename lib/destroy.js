'use strict'

const Resource = require('./resource')
const Response = require('./response')

module.exports = function destroy (req, res) {
  const resourceId = req.params.resourceId
  /* istanbul ignore if */
  if (!resourceId) {
    console.error('Routing Error: Destroy without ResourceId')
    return Response.internalError(res)
  }
  Resource.delete(resourceId, (err, response) => {
    /* istanbul ignore if */
    if (err) {
      console.error('Resource Deletion Error:', err)
      return Response.internalError(res)
    }
    if (!response.success) {
      return Response.notFound(res)
    }
    Response.ok(res)
  })
}
