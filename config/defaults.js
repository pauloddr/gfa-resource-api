'use strict'

const Gstore = require('gstore-node')

// After changing this object,
//   make sure to copy/paste it into README.
var defaults = {

  // Resource name. Must be set!
  // It will be used as the entity name in Datastore.
  // Recommended format: singular, capitalized. Ex: "Task"
  name: null,

  // Datastore settings.
  datastore: {
    namespace: undefined,

    // Default page size when listing resources.
    limit: 20
  },

  // You must provide the full schema.
  // This is just a working placeholder.
  schema: {
    name: {
      type: 'string',
      excludeFromIndexes: true
    },
    createdOn: {
      type: 'datetime',
      write: false,
      default: Gstore.defaultValues.NOW,
      excludeFromIndexes: true
    },
    modifiedOn: {
      type: 'datetime',
      write: false,
      excludeFromIndexes: true
    }
  },

  // Customize CORS headers here.
  cors: {
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,PATCH,DELETE',
    'Access-Control-Allow-Headers': 'origin,accept,content-type',

    // Better secure your API by allowing only specific domains.
    'Access-Control-Allow-Origin': '*',

    // Make sure you keep the exposed headers below
    //   or pagination may fail on the client side.
    'Access-Control-Expose-Headers': 'x-next-page-cursor,x-page-size'
  },

  // Default headers for all responses.
  headers: {
    'Content-Type': 'application/json'
  }

}

module.exports = defaults
