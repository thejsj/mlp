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
  var userId = req.body.userId || req.param('userId');
  collections.Users
    .query('where', 'id', '=', userId)
    .fetchOne()
    .then(function (model) {
      if (!model) {
        res.status(400).end();
        throw new Error('User not Found');
      }
      if (!title || !startTime || !endTime || !votingEndTime || !userId) {
        throw new Error('Not All Fields Entered');
      }
      return true;
    })
    .then(function () {
      return new models.Prompt({
          title: title,
          user_id: userId, // We really need to normalize these
          startTime: startTime,
          endTime: endTime,
          votingEndTime: votingEndTime
        })
        .save();
    })
    .then(function (model) {
      res.json(model.toJSON());
    });
});

promptRouter.get('/:id', function (req, res) {
  collections.Prompts
    .query('where', 'id', '=', req.param('id'))
    .fetchOne({
      withRelated: ['photos', 'user']
    })
    .then(function (model) {
      if (!model) res.status(404).end();
      // Look for images associates with this id
      res.json(model.toJSON());
      return true;
    }).catch(function (err) {
      console.log('Error:');
      console.log(err);
      res.status(404).end();
    });
});

promptRouter.put('/:id', function (req, res) {
  var winnerId = req.body.photoId;
  collections.Prompts
    .query('where', 'id', '=', req.param('id'))
    .fetchOne()
    .then(function (model) {
      if (!model) res.status(404).end();
      return model.save({
        winner_id: winnerId
      }, {
        patch: true
      });
    })
    .then(function (model) {
      return res.status(201).json(model.toJSON());
    }).catch(function (err) {
      console.log('Error:');
      console.log(err);
      res.status(404).end();
    });
});

module.exports = promptRouter;