var should = require('should');
var expect = require('chai').expect;
var request = require('request');
var moment = require('moment');

describe('API', function () {
  var user_id;
  beforeEach(function (done) {
    request
      .post({
        url: 'http://localhost:8000/login',
        form: {
          email: 'jorge.silva@thejsj.com',
          password: 'ilovebrian'
        }
      }, function (err, response, body) {
        user_id = JSON.parse(body).user_id;
        done();
      });
  });

  describe('Prompt', function () {
    it('should create a prompt', function (done) {
      var now = moment();
      request
        .get('http://localhost:8000/api/prompt')
        .form({
          title: 'Do the kbtz!',
          startTime: now.format('x'),
          endTime: now.add(4, 'h').format('x'),
          votingEndTime: now.add(6, 'h').format('x'),
        })
        .on('response', function (response) {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });

  xdescribe('Photo', function () {
    it('should create a photo in a post request', function (done) {
      request
        .get('http://localhost:8000/api/photo')
        .form({
          email: 'jorge.silva@thejsj.com',
          password: 'ilovebrian'
        })
        .on('response', function (response) {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });

    it('should get all photos', function (done) {
      request
        .get('http://localhost:8000/api/photo')
        .form({
          email: 'jorge.silva@thejsj.com',
          password: 'ilovebrian'
        })
        .on('response', function (response) {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });
});