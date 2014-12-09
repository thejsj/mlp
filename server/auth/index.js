//Sets up authentication and sessions

var passport = require('passport'); //Simple, unobtrusive authentication for Node.js - http://passportjs.org/
var LocalStrategy = require('passport-local').Strategy; //Username and password authentication strategy for Passport and Node.js.
var User = require('../models').User;
var collections = require('../collections');

//In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request.
//If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.

//Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session.
//In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.
//http://passportjs.org/guide/configure/
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

//Passport uses what are termed strategies to authenticate requests. Strategies range from verifying a username and password,
//delegated authentication using OAuth or federated authentication using OpenID.

//Before asking Passport to authenticate a request, the strategy (or strategies) used by an application must be configured.

//Strategies, and their configuration, are supplied via the use() function. For example,
//the following uses the LocalStrategy for username/password authentication.


passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  function (email, password, done) {
    collections.Users
      .query('where', 'email', '=', email)
      .fetchOne()
      .then(function (user) {
        return user.checkPassword(password)
          .then(function (isMatch) {
            if (!isMatch) return done(null, false);
            return done(null, user);
          });
      })
      .catch(function (err) {
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