var should = require('should');
var expect = require('chai').expect;
var request = require('request').defaults({
  jar: true
});
var moment = require('moment');
var _ = require('lodash');
var fs = require('fs');

describe('API', function () {

  describe('Unauthenticated Users', function () {
    it('should return a 401 if unauthenticated', function (done) {
      request
        .get('http://localhost:8000/api/photo', function (err, response, body) {
          expect(response.statusCode).to.equal(401);
          done();
        });
    });
  });

  describe('Authenticated Users', function () {

    var user_id;
    var _promptId = 1;

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
      var prompt_id;
      it('should create a prompt', function (done) {
        var now = moment();
        request
          .post({
            url: 'http://localhost:8000/api/prompt',
            form: {
              title: 'Do the kbtz!',
              userId: user_id,
              startTime: now.format('x'),
              endTime: now.add(4, 'h').format('x'),
              votingEndTime: now.add(6, 'h').format('x'),
            }
          }, function (err, response, body) {
            var json = JSON.parse(body);
            expect(response.statusCode).to.equal(200);
            expect(json.id).to.be.a.Integer;
            prompt_id = json.id;
            done();
          });
      });

      it('should get all prompts', function (done) {
        request
          .get('http://localhost:8000/api/prompt', function (err, response, body) {
            var json = JSON.parse(body);
            expect(response.statusCode).to.equal(200);
            expect(json).to.be.a.Array;
            expect(_.last(json).id).to.equal(prompt_id);
            done();
          });
      });

      it('should get a single prompt', function (done) {
        request
          .get('http://localhost:8000/api/prompt/' + prompt_id, function (err, response, body) {
            var json = JSON.parse(body);
            expect(response.statusCode).to.equal(200);
            expect(json).to.be.a.Array;
            expect(json.id).to.equal(prompt_id);
            done();
          });
      });
    });

    describe('Photo', function () {
      var photo_id;

      it('should create a photo in a post request', function (done) {
        var fileContents = fs.readFileSync(__dirname + '/Chicago.png');
        fs.writeFileSync(__dirname + '/_Chicago.png', fileContents);
        request
          .post({
              url: 'http://localhost:8000/api/photo',
              form: {
                user_id: 20,
                prompt_id: 1,
                image: fs.createReadStream(__dirname + '/_Chicago.png')
              }
            },
            function (err, response, body) {
              expect(response.statusCode).to.equal(200);
              done();
            });
      });

      it('should get all photos', function (done) {
        request
          .get('http://localhost:8000/api/photo', function (err, response, body) {
            var result = JSON.parse(body);
            expect(response.statusCode).to.equal(200);
            expect(_.last(result).prompt_id).to.equal(_promptId);
            photo_id = _.last(result).id;
            done();
          });
      });

      it('should get a specific photo', function (done) {
        request
          .get('http://localhost:8000/api/photo/' + photo_id, function (err, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse.bind(null, body)).to.not.throw('SyntaxError');
            expect(JSON.parse(body).prompt_id).to.equal(_promptId);
            done();
          });
      });
    });
  });

  xdescribe('Comment', function () {
    var _commentId;

    it('should create a comment', function (done) {
      request
        .post({
          url: 'http://localhost:8000/api/comment',
          form: {
            user_id: 20,
            prompt_id: 1,
            content: 'I hope this works'
          }
        }, function (err, response, body) {
          var json = JSON.parse(body);
          _commentId = json.id;
          expect(response.statusCode).to.equal(200);
          expect(json.id).to.be.Integer;
          done();
        });
    });

    it('should get all comments', function (done) {
      request
        .get('http://localhost:8000/api/comment', function (err, response, body) {
          var result = JSON.parse(body);
          expect(response.statusCode).to.equal(200);
          expect(_.last(result).id).to.equal(_commentId);
          done();
        });
    });
  });
});