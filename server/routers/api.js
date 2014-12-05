var express = require('express');
var apiRouter = express.Router();
var collections = require('../collections');
var multiparty = require('multiparty');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var moment = require('moment');
var path = require('path');
var _ = require('lodash');

apiRouter.get('/prompt', function (req, res) {
  res.status(200).end();
});

apiRouter.post('/prompt', function (req, res) {
  res.status(201).end();
});

apiRouter.get('/prompt/:id', function (req, res) {
  res.send(req.params.id).end();
});

// Photo
apiRouter.post('/photo', function (req, res) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    // Write File To File System
    var userId = fields.user_id;
    var promptId = fields.prompt_id;
    var fileExtension = _.last(files.image[0].originalFilename.split('.'));
    var newImageFileName = '' + userId + '_' + promptId + '-' + moment().format('x') + '.' + fileExtension;
    var newPath = path.join(__dirname, '/../media/', newImageFileName);
    fs.rename(files.image[0].path, newPath, function (err) {
      collections.Photos
        .create({
          user_id: userId,
          prompt_id: promptId,
          filename: newImageFileName // Relative to /media/
        })
        .then(function (photo) {
          res.json(photo.toJSON());
        });
    });
  });
});

apiRouter.get('/photo', function (req, res) {
  collections.Photo
    .fetchAll()
    .then(function (collection) {
      res.json(collection.toJSON()).end();
    });
});

module.exports = apiRouter;