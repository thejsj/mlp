var should = require('should');
var expect = require('chai').expect;
var request = require('request');

describe('Auth', function () {

  describe('Login', function () {
    it('should signup users', function (done) {
      request
        .post('http://localhost:8000/signup')
        .form({
          email: 'jorge.silva@thejsj.com',
          password: 'ilovebrian'
        })
        .on('response', function (response) {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });

    it('should login users', function (done) {
      request
        .post('http://localhost:8000/login')
        .form({
          email: 'jorge.silva@thejsj.com',
          password: 'ilovebrian'
        })
        .on('response', function (response) {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });

    it('should return the user id when logging in', function (done) {
      request
        .post({
          url: 'http://localhost:8000/login',
          form: {
            email: 'jorge.silva@thejsj.com',
            password: 'ilovebrian'
          }
        }, function (error, response, body) {
          JSON.parse(body).user_id.should.be.Integer;
          done();
        });
    });

    it('should return a 401 if a user doesn\'t exist', function (done) {
      request
        .post('http://localhost:8000/login')
        .form({
          email: 'jorge.silva.jetter@thejsj.com',
          password: 'idonotlovebrian'
        })
        .on('response', function (response) {
          expect(response.statusCode).to.equal(401);
          done();
        });
    });

    it('should return a 401 if an incorrect password is passed', function (done) {
      request
        .post('http://localhost:8000/login')
        .form({
          email: 'jorge.silva@thejsj.com',
          password: 'idonotlovebrian'
        })
        .on('response', function (response) {
          expect(response.statusCode).to.equal(401);
          done();
        });
    });
  });

});