'use strict';

const Gstore = require('gstore-node');

// After changing this object,
//   make sure to copy/paste it into README.
let configuration = {

  name: null, // must be set!

  // Datastore settings.
  datastore: {
    namespace: undefined
  },

  // You must provide the full schema.
  // This is just a working placeholder.
  schema:  {
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
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": 'GET, POST, PUT, PATCH, DELETE'
  },

};

configuration.override = function _override (config) {
  /* istanbul ignore if */
  if (!config) {
    return;
  }
  configuration.name = config.name;
  _set('session', config);
  _set('datastore', config);
  _set('schema', config);
  _set('cors', config);
};

function _set (section, object) {
  if (!object || !object[section]) {
    return;
  }
  Object.assign(configuration[section], object[section]);
}

module.exports = configuration;
