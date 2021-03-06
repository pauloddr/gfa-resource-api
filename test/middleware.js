'use strict'

const app = require('../support/test-app')
const expect = require('chai').expect

describe('middleware', function () {
  it('returns 404 on POST with ID', function (done) {
    app.post('/tasks/1').end(function (err, res) {
      expect(res.statusCode).to.equal(404)
      done()
    })
  })

  it('returns 404 on PUT without ID', function (done) {
    app.put('/tasks').end(function (err, res) {
      expect(res.statusCode).to.equal(404)
      done()
    })
  })

  it('returns 404 on PUT without ID and trailing slashes', function (done) {
    app.put('/tasks/').end(function (err, res) {
      expect(res.statusCode).to.equal(404)
      app.put('/tasks///').end(function (err, res) {
        expect(res.statusCode).to.equal(404)
        done()
      })
    })
  })

  it('returns 404 on DELETE without ID', function (done) {
    app.del('/tasks').end(function (err, res) {
      expect(res.statusCode).to.equal(404)
      done()
    })
  })

  it('returns 404 on DELETE without ID and trailing slashes', function (done) {
    app.del('/tasks/').end(function (err, res) {
      expect(res.statusCode).to.equal(404)
      app.del('/tasks///').end(function (err, res) {
        expect(res.statusCode).to.equal(404)
        done()
      })
    })
  })
})
