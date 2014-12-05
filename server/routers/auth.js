var express = require('express');
var auth = require('../auth');
var models = require('../models');
var collections = require('../collections');

var authRouter = express.Router();

authRouter.post('/login', auth.authenticate('local'), function (req, res) {
  res.send('You\'re logged in').end();
});

authRouter.post('/signup', function (req, res) {
  var email = req.body.email || req.param('email');
  var password = req.body.password || req.param('password');
  if (!email || !password) {
    res.status(400).end(); // Client Error
    return;
  }
  var user = new models.User({
      email: email,
      password: password
    }).save()
    .then(function (userModel) {
      res.json({
        email: email
      }).end();
    });
});

module.exports = authRouter;