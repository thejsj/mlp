var express = require('express');
var mediaRouter = express.Router();
var path = require('path');
var collections = require('../collections');

var mediaPath = path.join(__dirname + '/../media/');

mediaRouter.use(express.static(mediaPath));

mediaRouter.get('/:id', function (req, res) {
  collections.Photos
    .query('where', 'id', '=', req.param('id'))
    .fetchOne()
    .then(function (model) {
      var fileName = model.get('filename');
      var filePath = path.join(mediaPath + '/' + fileName);
      res.sendFile(filePath);
    });
});

module.exports = mediaRouter;