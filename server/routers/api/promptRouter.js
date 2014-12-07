var express = require('express');
var collections = require('../../collections');
var models = require('../../models');

var promptRouter = express.Router();

promptRouter.get('/', function (req, res) {
  models.Prompt.fetchAll().then(function (collection) {
    res.json(collection.toJSON());
  });
});

promptRouter.post('/', function (req, res) {
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

promptRouter.get('/:id', function (req, res) {
  collections.Prompts
    .query('where', 'id', '=', req.param('id'))
    .fetchOne({
      withRelated: ['photos']
    })
    .then(function (model) {
      if (!model) res.status(404).end();
      // Look for images associates with this id
      res.json(model.toJSON());
      return true;
    }).catch(function (err) {
      res.status(404).end();
    });
});

module.exports = promptRouter;