'use strict';

const app = require('../support/test-app');
const expect = require('chai').expect;
const helpers = require('../support/test-helpers');

describe('find', function () {

  let resource;

  before(function (done) {
    let data = {title: 'Test', description: 'test'}
    helpers.create_entity(data, (err, entity) => {
      if (err) return done(err);
      resource = entity;
      done();
    });
  });

  after(function (done) {
    helpers.delete_all_resources(done);
  });

  it('returns 404 if resource does not exist', function (done) {
    app.get('/tasks/idonotexist').end(function (err, res) {
      expect(res.body.code).to.equal('NOT_FOUND');
      done();
    });
  });

  it('returns resource data', function (done) {
    app.get(`/tasks/${resource.id}`).end(function (err, res) {
      expect(res.body.code).to.equal('OK');
      expect(res.body.resource.title).to.equal('Test');
      expect(res.body.resource.description).to.equal('test');
      done();
    });
  });


});
