var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models').User;
var collections = require('../collections');

passport.serializeUser(function (user, done) {
  return done(null, user.get('id'));
});

passport.deserializeUser(function (id, done) {
  collections.Users
    .query('where', 'id', '=', id)
    .fetchOne()
    .then(function (model) {
      return done(null, model);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  function (email, password, done) {
    collections.Users
      .query('where', 'email', '=', email)
      .fetchOne()
      .then(function (model) {
        return done(null, model);
      });
  }
));

passport.checkIfLoggedIn = function (req, res, next) {
  if (req.user) {
    return next();
  }
  return res.status(401).send('You\'re not logged in');
};

module.exports = passport;