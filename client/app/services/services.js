angular.module('mlp.services', [])
  .factory('Auth', function ($http, $location, $window, $state) {
    // Auth
    var auth = {
      userId: null,
      logIn: function (user) {
        return $http.post('/login', {
            email: user.email,
            password: user.password
          })
          .then(function (res) {
            $state.go('prompts');
          });
      },
      signUp: function (user) {
        return $http.post('/signup', {
            email: user.email,
            password: user.password
          })
          .then(function (res) {
            $state.go('prompts');
          });
      },
      isAuth: function (redirectToHomeIfLoggedIn, dontRedirectToLogin) {
        return $http.get('/isloggedin')
          .then(function (res, messasge, body) {
            userId = res.data.user_id;
            return userId;
          }).then(function () {
            if (userId !== null && typeof userId === 'number') {
              if (redirectToHomeIfLoggedIn) {
                $state.go('prompts');
              }
              return userId;
            } else {
              if (dontRedirectToLogin !== false) $state.go('logIn');
            }
          }).catch(function (err) {
            if (dontRedirectToLogin !== false) $state.go('logIn');
          });
      },
      signOut: function () {
        return $http.post('/signout')
          .then(function (res) {
            $state.go('logIn');
          });
      }
    };
    return auth;
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
    //TODO: make this serve specific prompts.
    //TODO: make prompt.js use this function to render itself.
    var getPromptData = function (id) {
      console.log("getting photo data from server");
      return $http.get('/api/prompt/1')
        .then(function (res) {
          console.log('api/prompt/1: res.data');
          console.log(res.data);
          return res.data;
        });
    };

    var setPromptWinner = function (promptId, photoId) {
      console.log("setting prompt winner");
      $http.post('/api/prompt/setWinner', {
        prompt_id: prompt_id,
        password: photo_id
      });
    };

    return {
      getAllPromptsData: getAllPromptsData,
      getPromptData: getPromptData
    };


  });