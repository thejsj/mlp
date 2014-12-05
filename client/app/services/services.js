angular.module('mlp.services', [])


.factory('Auth', function ($http, $location, $window) {
  // this is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  
  var logIn = function (user) {
   console.log("Authfactory logging in user: ", user)
    // return $http({
    //   method: 'POST',
    //   url: '/api/users/login',
    //   data: user
    // })
    // .then(function (resp) {
    //   return resp.data.token;
    // });
  };

  var signUp = function (user) {
    
    console.log("Authfactory signing up user: ", user);
    // return $http({
    //   method: 'POST',
    //   url: '/api/users/signup',
    //   data: user
    // })
    // .then(function (resp) {
    //   return resp.data.token;
    // });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signOut = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    logIn: logIn,
    signUp: signUp,
    isAuth: isAuth,
    signOut: signOut
  };

});

