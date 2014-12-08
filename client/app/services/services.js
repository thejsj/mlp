angular.module('mlp.services', [])
  .factory('Auth', function ($http, $location, $window, $state) {
    // Auth
    var userId;
    var auth = {
      logIn: function (user) {
        return $http.post('/login', {
            email: user.email,
            password: user.password
          })
          .then(function (res) {
            if (res.data.user_id) {
              userId = res.data.user_id;
            }
            $state.go('prompts');
          });
      },
      getUserId: function () {
        return userId;
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
      return $http.get('/api/prompt');
    };
    var getPromptData = function (id) {
      return $http.get('/api/prompt/' + id)
        .then(function (res) {
          return res.data;
        });
    };
    var setPromptWinner = function (promptId, photoId) {
      return $http.put('/api/prompt/' + promptId, {
        photoId: photoId,
      });
    };
    var createNewPrompt = function (obj) {
      return $http.post('/api/prompt', obj);
    };
    return {
      getAllPromptsData: getAllPromptsData,
      getPromptData: getPromptData,
      createNewPrompt: createNewPrompt,
      setPromptWinner: setPromptWinner
    };
  })
  .factory('PhotoFactory', function ($http) {
    var photoFactory = {
      get: function (id) {
        return $http.get('/api/photo/' + id);
      }
    };
    return photoFactory;
  });