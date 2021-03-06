//Comment Routers

var express = require('express');
var collections = require('../../collections');
var models = require('../../models');

var commentRouter = express.Router(); //call an instance of the express.Router() and apply comment routes to it

commentRouter.get('/', function (req, res) {
  models.Comment.fetchAll().then(function (collection) {
    res.json(collection.toJSON());
  });
});

//creates a new comment and posts it to the server
commentRouter.post('/', function (req, res) {
  var content = req.body.content || req.param('content');
  if (!content) {
    res.status(400).end();
  }
  var newComment = new models.Comment({
      content: content
    })
    .save()
    .then(function (model) {
      res.json(model.toJSON());
    });
});

//gets comments 
commentRouter.get('/:id', function (req, res) {
  collections.Comments
    .query('where', 'id', '=', req.param.id)
    .fetchOne()
    .then(function (model) {
      res.json(model.toJSON());
    });
});

module.exports = commentRouter;