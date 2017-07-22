'use strict'

const app = require('../support/test-app')
const expect = require('chai').expect
const helpers = require('../support/test-helpers')

describe('create', function () {
  after(function (done) {
    helpers.delete_all_resources(done)
  })

  it('fails with blank required field', function (done) {
    let data = {title: ''}
    app.post('/tasks').send(data).end(function (err, res) {
      expect(res.statusCode).to.equal(422)
      expect(res.body.error).to.equal('Property { title } is required')
      done()
    })
  })

  it('creates resource with valid data and returns sanitized resource', function (done) {
    let data = {title: 'Test', description: 'test'}
    app.post('/tasks').send(data).end(function (err, res) {
      expect(res.statusCode).to.equal(201)
      expect(res.body.title).to.equal('Test')
      expect(res.body.description).to.equal('test')
      expect(res.body.id).to.exist
      done()
    })
  })
})
