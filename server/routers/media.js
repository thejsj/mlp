//Creates the router to send all photos from the database back to the client

var express = require('express');
var mediaRouter = express.Router();
var path = require('path');
var collections = require('../collections');

//Static path to where all of the photos are stored
var mediaPath = path.join(__dirname + '/../media/');

mediaRouter.use(express.static(mediaPath));

//Gets and sends one photo based on either photo_is or filename
mediaRouter.get('/:id', function (req, res) {
  collections.Photos
    .query('where', 'id', '=', req.param('id'))
    .fetchOne()
    .then(function (model) {
      if (!model) return res.status(404).end();
      var fileName = model.get('filename');
      var filePath = path.join(mediaPath + '/original/' + fileName);
      res.sendFile(filePath);
    });
});

module.exports = mediaRouter;