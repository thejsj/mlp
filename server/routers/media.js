var express = require('express');
var mediaRouter = express.Router();

mediaRouter.get('/:id', function (req, res) {
  collections.Photos
    .query('where', 'id', '=', req.param.id)
    .fetchOne()
    .then(function (model) {
      var filePath = model.get('filename');
      res.sendFile(filePath);
    });
});

module.exports = mediaRouter;