var should = require('should');
var expect = require('chai').expect;
var request = require('request');

describe('Auth', function () {

  describe('Login', function () {
    it('should login users', function (done) {
      request
        .post('http://localhost:8000/login', {
          form: {
            username: 'thejsj',
            password: 'ilovebrian'
          }
        })
        .on('response', function (response) {
          expect(response.statusCode).to.equal(200);
        });
    });
  });

});