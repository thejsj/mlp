angular.module('mlp.services', [])
  .factory('Auth', function ($http, $location, $window, $state) {
    // Auth
    // this is responsible for authenticating our user
    // by exchanging the user's username and password
    // for a JWT from the server
    // that JWT is then stored in localStorage as 'com.shortly'
    // after you signin/signup open devtools, click resources,
    // then localStorage and you'll see your token from the server
    var logIn = function (user) {
      return $http.post('/login', {
          email: user.email,
          password: user.password
        })
        .then(function (res) {
          $state.go('prompts');
        });
    };
    var signUp = function (user) {
      return $http.post('/signup', {
          email: user.email,
          password: user.password
        })
        .then(function (res) {
          $state.go('prompts');
        });
    };
    var isAuth = function (redirectToHomeIfLoggedIn, dontRedirectToLogin) {
      return $http.get('/isloggedin')
        .then(function (res) {
          if (redirectToHomeIfLoggedIn) {
            $state.go('prompts');
          }
        }).catch(function (err) {
          if (dontRedirectToLogin !== false) $state.go('logIn');
        });
    };
    var signOut = function () {
      return $http.post('/signout')
        .then(function (res) {
          $state.go('logIn');
        });
    };
    return {
      logIn: logIn,
      signUp: signUp,
      isAuth: isAuth,
      signOut: signOut
    };
  })
  .factory('PromptFactory', function ($http) {
    var getAllPromptsData = function (dest) {
      console.log("getting all prompts data from server");
      return $http.get('/api/prompt')
        .success(function (res) {
          console.log(res.body);
          dest = res.body;
        });
    };
    //NOTE! currently hard-coded to get the first prompt on server no matter what.
    var getPromptData = function (id, dest) {
      console.log("getting photo data from server");
      return $http.get('/api/prompt')
        .then(function (res) {
          console.log(res.data);
          dest = res.data[0];
          console.log(dest);
        });
    };
    return {
      getAllPromptsData: getAllPromptsData,
      getPromptData: getPromptData
    };
  });