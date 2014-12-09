//Create the routes for the login, signout, and singup routes and uses the sever/auth/index.js file to check for authentication

var express = require('express');
var auth = require('../auth'); //this file is sever/auth/index.js it uses passport for authentication
var models = require('../models');
var collections = require('../collections');

var authRouter = express.Router();

//auth.authenticate() authenticaticates requests, 'local' specifies which strategy to employ.
//The local Strategy allows us to authenticate users by looking up their data in the app's database.
authRouter.post('/login', auth.authenticate('local'), function (req, res) {
  res.json({
    user_id: req.user.get('id')
  });
});

//Checks to see if the user is a valid user and if so returns their user_id
authRouter.get('/isloggedin', function (req, res) {
  var user_id = null;
  if (req.user && req.user.get('id')) {
    user_id = req.user.get('id');
  }
  res.json({
    user_id: user_id
  });
});

//Signs user out of account, destroying their current session and redirectiong them back to the loggin page
authRouter.use('/signout', function (req, res) {
  req.session.destroy(function (err) {
    req.logout();
    res.redirect('/');
  });
});

//checks to see if user has entered and email and password and if not returns a bad request
//If both the email and password have been included it creates and saves a new user in the database and
//responds with the users email
authRouter.post('/signup', function (req, res) {
  var email = req.body.email || req.param('email');
  var password = req.body.password || req.param('password');
  if (!email || !password) {
    res.status(400).end(); // Client Error
    return;
  }

  collections.Users
    .query('where', 'email', '=', email)
    .fetchOne()
    .then(function (user) {
      if (user !== null) {
        res.json({
          email: email
        });
        return;
      }
      var user = new models.User({
          email: email,
          password: password
        }).save()
        .then(function (userModel) {
          res.json({
            email: email
          });
        });
    });
});

module.exports = authRouter;