var express = require('express');
var auth = require('../auth');
var User = require('../models');
var collections = require('../collections');

var authRouter = express.Router();

authRouter.post('/login', auth.authenticate('local'), function (req, res) {
  console.log('req.user');
  console.log(req.user);
  res.send('You\'re logged in').end();
});

authRouter.post('/signup', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  if (!email || !password) {
    res.status(400).end(); // Client Error
    return;
  }
  var user = new User({
      email: email,
      password: password
    }).save()
    .then(function (userModel) {
      res.json({
        email: email
      });
    });
});

module.exports = authRouter;