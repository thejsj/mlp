var express = require('express');
var collections = require('../../collections');
var models = require('../../models');
var multiparty = require('multiparty');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var moment = require('moment');
var path = require('path');
var _ = require('lodash');
var imageMagick = Promise.promisifyAll(require('imagemagick'));

var photoRouter = express.Router();

photoRouter.post('/', function (req, res) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    // Write File To File System
    var userId, promptId, filePath;
    if (typeof fields === 'object') {
      userId = fields.user_id[0] || fields.user_id;
      promptId = fields.prompt_id[0] || fields.prompt_id;
      if (files.file) {
        filePath = files.file[0].path || null;
      } else if (files.image) {
        filePath = files.image[0].path || null;
      } else {
        res.status(404).end();
      }
    } else {
      userId = req.body.user_id;
      promptId = req.body.prompt_id;
      filePath = req.body['image[path]'] || null;
      imageString = req.body.image_string || null;
    }
    if (filePath !== null) {
      filePath = path.resolve(filePath);
      var fileExtension = _.last(filePath.split('.'));

      var name = '' + userId + '-' + promptId + '-' + moment().format('x');
      var newImageFileName = name + '.' + fileExtension;
      var newPath = path.join(__dirname, '/../../media/original/', newImageFileName);
      var new200Path = path.join(__dirname, '/../../media/square-200px/', newImageFileName);
      var new500Path = path.join(__dirname, '/../../media/square-500px/', newImageFileName);

      fs.chmodAsync(filePath, '0777')
        .then(function () {
          return fs.renameAsync(filePath, newPath);
        })
        .then(function () {
          return imageMagick.cropAsync({
            srcPath: newPath,
            dstPath: new200Path,
            width: 200,
            height: 200
          });
        }).then(function () {
          return imageMagick.cropAsync({
            srcPath: newPath,
            dstPath: new500Path,
            width: 500,
            height: 500
          });
        }).then(function () {
          return new models.Photo({
              user_id: userId,
              prompt_id: promptId,
              filename: newImageFileName // Relative to /media/
            })
            .save();
        }).then(function (photo) {
          res.json(photo.toJSON());
        }).catch(function (err) {
          console.log('fs.rename error: ', err);
          res.status(400).end();
        });
    } else {
      res.status(400).end();
    }

  });
});

photoRouter.get('/', function (req, res) {
  models.Photo // Doesn't seem to be working
    .fetchAll()
    .then(function (coll) {
      res.json(coll.toJSON()).end();
    });
});

photoRouter.get('/:id', function (req, res) {
  collections.Photos // Doesn't seem to be working
    .query('where', 'id', '=', req.param('id'))
    .fetchOne({
      withRelated: ['user', 'prompt']
    })
    .then(function (model) {
      if (!model) {
        res.status(404).end();
      } else {
        res.json(model.toJSON()).end();
      }
    });
});

module.exports = photoRouter;