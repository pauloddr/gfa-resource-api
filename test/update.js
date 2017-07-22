'use strict'

const app = require('../support/test-app')
const expect = require('chai').expect
const helpers = require('../support/test-helpers')

describe('update', function () {
  let resource

  before(function (done) {
    let data = {title: 'Test', description: 'test'}
    helpers.create_entity(data, (err, entity) => {
      resource = entity
      done(err)
    })
  })

  after(function (done) {
    helpers.delete_all_resources(done)
  })

  it('validates input', function (done) {
    app.put(`/tasks/${resource.id}`).send({email: 'invalidemail'}).end(function (err, res) {
      expect(res.body.code).to.equal('BAD_REQUEST')
      done()
    })
  })

  it('updates resource', function (done) {
    let data = {title: 'Changed', description: 'changed'}
    app.put(`/tasks/${resource.id}`).send(data).end(function (err, res) {
      expect(res.body.code).to.equal('OK')
      expect(res.body.resource.title).to.equal('Changed')
      expect(res.body.resource.description).to.equal('changed')
      app.get(`/tasks/${resource.id}`).end(function (err, res) {
        expect(res.body.code).to.equal('OK')
        expect(res.body.resource.title).to.equal('Changed')
        expect(res.body.resource.description).to.equal('changed')
        done()
      })
    })
  })
})
