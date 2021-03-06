'use strict'

const app = require('../support/test-app')
const expect = require('chai').expect
const helpers = require('../support/test-helpers')
const Resource = require('../lib/resource')

describe('destroy', function () {
  let resource

  before(function (done) {
    let data = {title: 'Test', description: 'test'}
    helpers.create_entity(data, (err, entity) => {
      if (err) return done(err)
      resource = entity
      done()
    })
  })

  after(function (done) {
    helpers.delete_all_resources(done)
  })

  it('deletes resource', function (done) {
    app.del(`/tasks/${resource.id}`).end(function (err, res) {
      expect(res.statusCode).to.equal(204)
      app.get(`/tasks/${resource.id}`).end(function (err, res) {
        expect(res.statusCode).to.equal(404)
        done()
      })
    })
  })

  it('returns 404 if resourceId does not exist', function (done) {
    // resource.id was deleted by the previous test
    app.del(`/tasks/${resource.id}`).end(function (err, res) {
      expect(res.statusCode).to.equal(404)
      done()
    })
  })
})
