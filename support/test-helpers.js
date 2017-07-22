'use strict'

const app = require('../support/test-app')
const Resource = require('../lib/resource')

// Using underscore naming conventions here
//   just so they're more readable in tests.

module.exports = {
  create_entity,
  create_many_resources,
  delete_all_resources
}

function create_entity (data, done) {
  let entity = new Resource(data)
  entity.save((err, entity) => {
    if (err) return done(err)
    done(null, entity.plain())
  })
}

function create_many_resources (quantity, done) {
  var i, data, remaining = quantity
  for (i = 0; i < quantity; ++i) {
    data = {title: `Title ${i}`, description: `description ${i}`}
    create_entity(data, (err, entity) => {
      remaining--
      if (remaining === 0) {
        done()
      }
    })
  }
}

function delete_all_resources (done) {
  Resource.deleteAll(done)
}
