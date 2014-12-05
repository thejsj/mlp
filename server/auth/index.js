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
      .then(function (user) {
        console.log('checkPassword: ', password);
        console.log('-: ', user.get('password'));
        return user.checkPassword(password)
          .then(function (isMatch) {
            console.log('isMatch');
            if (!isMatch) return done(null, false);
            return done(null, user);
          });
      })
      .catch(function (err) {
        console.log('catch:', err);
        return done(null, false);
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