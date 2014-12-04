var express = require('express');
var apiRouter = express.Router();

apiRouter.get('/prompt', function (req, res) {
  res.status(200).end();
});

apiRouter.post('/prompt', function (req, res) {
  res.status(201).end();
});

apiRouter.get('/prompt/:id', function (req, res) {
  res.send(req.params.id).end();
});

module.exports = apiRouter;