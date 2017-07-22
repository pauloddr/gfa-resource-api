'use strict'

require('../config/test')

const Gstore = require('gstore-node')

const GoogleFunctionResource = require('../index')({
  name: 'Task',
  schema: {
    title: {
      type: 'string',
      required: true,
      excludeFromIndexes: true
    },
    description: {
      type: 'string',
      excludeFromIndexes: true
    },
    email: {
      type: 'string',
      optional: true,
      validate: 'isEmail',
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
  }
})

const expressApp = require('express')()
const bodyParser = require('body-parser')
expressApp.use(bodyParser.json())

expressApp.all('/tasks/?*', function (req, res) {
  GoogleFunctionResource.manage(req, res)
})

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

module.exports = chai.request.agent(expressApp)
