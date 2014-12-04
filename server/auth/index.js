var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log('Username: ', username);
    console.log('Password: ', password);
    if (username === 'thejsj' && password === 'ilovebrian') {
      return done(null, {
        username: username,
        password: password
      });
    }
    return done(null, null, {
      message: 'Incorrect password.'
    });
  }
));

passport.checkIfLoggedIn = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

module.exports = passport;