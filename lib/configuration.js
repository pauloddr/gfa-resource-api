'use strict'

const Gstore = require('gstore-node')

// After changing this object,
//   make sure to copy/paste it into README.
let configuration = {

  // Resource name. Must be set!
  // It will be used as the entity name in Datastore.
  // Recommended format: singular, capitalized. Ex: "Task"
  name: null,

  // Datastore settings.
  datastore: {
    namespace: undefined,
    limit: 20 // default page size
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

  // Customize CORS headers here to anything you'd like.
  // Multiple headers are accepted.
  cors: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'origin, content-type, accept'
  }

}

configuration.override = function _override (config) {
  /* istanbul ignore if */
  if (!config) {
    return
  }
  configuration.name = config.name
  _set('datastore', config)
  _set('schema', config)
  _set('cors', config)
}

function _set (section, config) {
  if (!config || !config[section]) {
    return
  }
  configuration[section] = config[section]
}

module.exports = configuration
