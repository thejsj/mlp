var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var cors = require('cors');
var auth = require('./auth');

var authRouter = require('./routers/auth');
var apiRouter = require('./routers/api');
var mediaRouter = require('./routers/media');

// Middleware
var app = express();
app.use(cookieParser());
// Fix this line when we get our first million
// http://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '10mb'
}));
app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(auth.initialize());
app.use(auth.session());
app.use(cors());

// Application
var port = process.env.PORT || 8000;
console.log('Server listening on ' + port);

app
  .use(express.static(path.resolve(__dirname + '/../client/')))
  .use(authRouter)
  .use('/media', auth.checkIfLoggedIn, mediaRouter)
  .use('/api', auth.checkIfLoggedIn, apiRouter)
  .use('*', function (req, res) {
    res.status(404).end();
  })
  .listen(port);