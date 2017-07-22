'use strict'

const config = require('./configuration')
const Gstore = require('gstore-node')
const datastore = require('@google-cloud/datastore')({
  namespace: config.datastore.namespace
})

Gstore.connect(datastore)

const Schema = Gstore.Schema
const schema = new Schema(config.schema)

// Queries

schema.queries('list', {
  limit: config.datastore.limit
})

const Resource = Gstore.model(config.name, schema)

module.exports = Resource
