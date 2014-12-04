var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');

var db = require('./db');
var models = require('./models');
var auth = require('./auth');

var apiRouter = require('./routers/api');
var mediaRouter = require('./routers/media');

// Middleware
var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(auth.initialize());
app.use(auth.session());

// Application
var port = process.env.PORT || 8000;
console.log('Server listening on ' + port);

app
  .use(express.static(path.resolve(__dirname + '/../client/')))
  // .post('/login', auth.checkIfLoggedIn)
  .use('/media', mediaRouter)
  .use('/api', apiRouter)
  .use('*', function (req, res) {
    res.status(404).end();
  })
  .listen(port);