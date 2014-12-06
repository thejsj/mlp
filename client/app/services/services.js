angular.module('mlp.services', [])


.factory('Auth', function ($http) {
  // this is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  
  var logIn = function (user) {
   console.log("Authfactory logging in user: ", user)
    return $http.post('/login', {
      email: user.email,
      password: user.password
    })
    .then(function (res) {
      console.log(res);
    });
  };

  var signUp = function (user) {
    console.log("Authfactory signing up user: ", user);
    return $http.post('/signup', {
      email: user.email,
      password: user.password
    })
    .then(function (res) {
      console.log(res);
    });
  };

  var isAuth = function () {
  };

  var signOut = function () {
  };


  return {
    logIn: logIn,
    signUp: signUp,
    isAuth: isAuth,
    signOut: signOut
  };

})

.factory('PromptFactory', function ($http){

  var getAllPromptsData = function(dest) {
   console.log("getting all prompts data from server")
    return $http.get('/api/prompt')
    .success(function (res) {
      console.log(res.body);
      dest = res.body;
    });
  };

  //NOTE! currently hard-coded to get the first prompt on server no matter what.
  var getPromptData = function(id,dest) {
   console.log("getting photo data from server")
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

})


