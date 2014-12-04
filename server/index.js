var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var db = require('./db');
var models = require('./models');

var apiRoutes = require('./routes/api');
var mediaRoutes = require('./routes/media');

var app = express();

app.use('/media', mediaRoutes.route);
app.use('/api', apiRoutes.route);
app.use(express.static(__dirname + '/../client'));


var port = process.env.PORT || 8000;
console.log('Server listening on ' + port);
app.listen(port);