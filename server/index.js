var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var db = require('./db');
var models = require('./models');

var apiRoutes = require('./routes/api');
var mediaRoutes = require('./routes/media');

var app = express();
var port = process.env.PORT || 8000;
console.log('Server listening on ' + port);

app
  .use('/media', mediaRoutes.route)
  .use('/api', apiRoutes.route)
  .use(express.static(path.resolve(__dirname + '/../client/')))
  .use('*', function (req, res) {
    res.status(404).end();
  })
  .listen(port);