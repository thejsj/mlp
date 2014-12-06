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
  models.Prompt.fetchAll().then(function (collection) {
    res.json(collection.toJSON());
  });
});

apiRouter.post('/prompt', function (req, res) {
  var title = req.body.title || req.param('title');
  var startTime = req.body.startTime || req.param('startTime');
  var endTime = req.body.endTime || req.param('endTime');
  var votingEndTime = req.body.votingEndTime || req.param('votingEndTime');

  if (!title || !startTime || !endTime || !votingEndTime) {
    res.status(400).end();
  }
  var newPrompt = new models.Prompt({
      title: title,
      startTime: startTime,
      endTime: endTime,
      votingEndTime: votingEndTime
    })
    .save()
    .then(function (model) {
      res.json(model.toJSON());
    });
});

apiRouter.get('/prompt/:id', function (req, res) {
  collections.Prompts
    .query('where', 'id', '=', req.param.id)
    .fetchOne()
    .then(function (model) {
      res.json(model.toJSON());
    });
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
  models.Photo // Doesn't seem to be working
    .fetchAll()
    .then(function (coll) {
      res.json(coll.toJSON()).end();
    });
});

apiRouter.get('/photo/:id', function (req, res) {
  collections.Photos // Doesn't seem to be working
    .query('where', 'id', '=', req.param.id)
    .fetchOne()
    .then(function (model) {
      if (!model) {
        res.status(404).end();
      } else {
        res.json(model.toJSON()).end();
      }
    });
});

module.exports = apiRouter;