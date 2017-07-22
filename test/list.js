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
      expect(res.statusCode).to.equal(200)
      expect(res.body.length).to.equal(20)
      expect(res.headers['x-next-page-cursor']).to.exist
      done()
    })
  })

  it('returns a list of resources with limit', function (done) {
    app.get('/tasks').query({limit: 15}).end(function (err, res) {
      expect(res.statusCode).to.equal(200)
      expect(res.body.length).to.equal(15)
      expect(res.headers['x-next-page-cursor']).to.exist
      done()
    })
  })

  it('returns a list of resources with start', function (done) {
    app.get('/tasks').query({limit: 20}).end(function (err, res) {
      start = res.headers['x-next-page-cursor']
      expect(start).to.exist
      app.get('/tasks').query({start}).end(function (err, res) {
        expect(res.statusCode).to.equal(200)
        expect(res.body.length).to.equal(10)
        done()
      })
    })
  })
})
