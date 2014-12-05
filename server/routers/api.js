var express = require('express');
var apiRouter = express.Router();
var collections = require('../collections');
var models = require('../models');
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
    var userId, promptId, filePath;
    if (typeof fields === 'object') {
      userId = fields.user_id;
      promptId = fields.prompt_id;
      filePath = files.image[0].path;
    } else {
      userId = req.body.user_id;
      promptId = req.body.prompt_id;
      filePath = req.body['image[path]'];
    }
    var fileExtension = _.last(filePath.split('.'));
    var newImageFileName = '' + userId + '-' + promptId + '-' + moment().format('x') + '.' + fileExtension;
    var newPath = path.join(__dirname, '/../media/', newImageFileName);
    fs.rename(filePath, newPath, function (err) {
      console.log(collections.Photos);
      var photo = new models.Photo({
          user_id: userId,
          prompt_id: promptId,
          filename: newImageFileName // Relative to /media/
        })
        .save()
        .then(function (photo) {
          res.json(photo.toJSON());
        });
    });
  });
});

apiRouter.get('/photo', function (req, res) {
  collections.Photo
    .fetchAll()
    .then(function (coll) {
      res.json(coll.toJSON()).end();
    });
});

module.exports = apiRouter;