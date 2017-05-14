'use strict';

const app = require('../support/test-app');
const expect = require('chai').expect;
const helpers = require('../support/test-helpers');

describe('create', function () {

  after(function (done) {
    helpers.delete_all_resources(done);
  });

  it('fails with blank required field', function (done) {
    let data = {title: ''};
    app.post('/tasks').send(data).end(function (err, res) {
      expect(res.body.code).to.equal('BAD_REQUEST');
      expect(res.body.reason).to.equal('Property { title } is required');
      done();
    });
  });

  it('creates resource with valid data and returns sanitized resource', function (done) {
    let data = {title: 'Test', description: 'test'};
    app.post('/tasks').send(data).end(function (err, res) {
      expect(res.body.code).to.equal('OK');
      expect(res.body.resource.title).to.equal('Test');
      expect(res.body.resource.description).to.equal('test');
      expect(res.body.resource.id).to.exist;
      done();
    });
  });

});
