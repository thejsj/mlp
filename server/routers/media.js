var express = require('express');
var mediaRouter = express.Router();

mediaRouter.get('/:id', function (req, res) {
  res.send(req.params.id).end();
});

mediaRouter.post('/', function (req, res) {
  res.status(201).end();
});

module.exports = mediaRouter;