'use strict'

const app = require('../support/test-app')
const expect = require('chai').expect
const helpers = require('../support/test-helpers')

describe('find', function () {
  let resource

  before(function (done) {
    let data = {title: 'Test Find', description: 'test find'}
    helpers.create_entity(data, (err, entity) => {
      if (err) return done(err)
      resource = entity
      done()
    })
  })

  after(function (done) {
    helpers.delete_all_resources(done)
  })

  it('returns 404 if resource does not exist', function (done) {
    app.get('/tasks/idonotexist').end(function (err, res) {
      expect(res.statusCode).to.equal(404)
      done()
    })
  })

  it('returns resource data', function (done) {
    app.get(`/tasks/${resource.id}`).end(function (err, res) {
      expect(res.statusCode).to.equal(200)
      expect(res.body.title).to.equal('Test Find')
      expect(res.body.description).to.equal('test find')
      done()
    })
  })
})
