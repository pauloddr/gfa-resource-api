'use strict'

const app = require('../support/test-app')
const expect = require('chai').expect
const helpers = require('../support/test-helpers')

describe('list', function () {
  this.timeout(10000)

  let start

  before(function (done) {
    helpers.create_many_resources(30, done)
  })

  after(function (done) {
    helpers.delete_all_resources(done)
  })

  it('returns a list of resources with default settings', function (done) {
    app.get('/tasks').end(function (err, res) {
      expect(res.body.code).to.equal('OK')
      expect(res.body.resources.length).to.equal(20)
      expect(res.body.next).to.exist
      done()
    })
  })

  it('returns a list of resources with limit', function (done) {
    app.get('/tasks').query({limit: 15}).end(function (err, res) {
      expect(res.body.code).to.equal('OK')
      expect(res.body.resources.length).to.equal(15)
      expect(res.body.next).to.exist
      done()
    })
  })

  it('returns a list of resources with start', function (done) {
    app.get('/tasks').query({limit: 20}).end(function (err, res) {
      expect(res.body.next).to.exist
      start = res.body.next
      app.get('/tasks').query({start}).end(function (err, res) {
        expect(res.body.code).to.equal('OK')
        expect(res.body.resources.length).to.equal(10)
        done()
      })
    })
  })

  it('sets limit to 20 on invalid values', function (done) {
    app.get('/tasks').query({limit: -1}).end(function (err, res) {
      expect(res.body.code).to.equal('OK')
      expect(res.body.limit).to.equal(20)
      app.get('/tasks').query({limit: 99999}).end(function (err, res) {
        expect(res.body.code).to.equal('OK')
        expect(res.body.limit).to.equal(20)
        done()
      })
    })
  })
})
