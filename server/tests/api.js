var should = require('should');
var expect = require('chai').expect;
var request = require('request').defaults({
  jar: true
});
var moment = require('moment');
var _ = require('lodash');
var fs = require('fs');

describe('API', function () {
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

  xdescribe('Prompt', function () {
    it('should create a prompt', function (done) {
      var now = moment();
      request
        .post({
          url: 'http://localhost:8000/api/prompt',
          form: {
            title: 'Do the kbtz!',
            startTime: now.format('x'),
            endTime: now.add(4, 'h').format('x'),
            votingEndTime: now.add(6, 'h').format('x'),
          }
        }, function (err, response) {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('Photo', function () {
    it('should create a photo in a post request', function (done) {
      request
        .post({
            url: 'http://localhost:8000/api/photo',
            form: {
              user_id: 20,
              prompt_id: 1,
              image: fs.createReadStream(__dirname + '/Chicago.png')
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
          console.log(body);
          var result = JSON.parse(body);
          console.log(_.last(result));
          expect(response.statusCode).to.equal(200);
          expect(_.last(result).prompt_id).to.equal(_promptId);
          done();
        });
    });
  });
});