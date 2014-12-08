angular.module('mlp.services', [])
  .factory('MainUrl', function ($window) {
    var url = $window.IP_ADDRESS || '';
    console.log('IP_ADDRESS:', url);
    return {
      get: function (append) {
        return url + append;
      }
    };
  })
  .factory('Auth', function ($http, $location, $window, $state, MainUrl) {
    // Auth
    var userId;
    var auth = {
      logIn: function (user) {
        return $http.post(MainUrl.get('/login'), {
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
        return $http.post(MainUrl.get('/signup'), {
            email: user.email,
            password: user.password
          })
          .then(function (res) {
            $state.go('prompts');
          });
      },
      isAuth: function (redirectToHomeIfLoggedIn, dontRedirectToLogin) {
        return $http.get(MainUrl.get('/isloggedin'))
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
        return $http.post(MainUrl.get('/signout'))
          .then(function (res) {
            $state.go('logIn');
          });
      }
    };
    return auth;
  })
  .factory('PromptFactory', function ($http, MainUrl) {
    var getAllPromptsData = function (dest) {
      return $http.get(MainUrl.get('/api/prompt'));
    };
    var getPromptData = function (id) {
      return $http.get(MainUrl.get('/api/prompt/' + id))
        .then(function (res) {
          return res.data;
        });
    };
    var setPromptWinner = function (promptId, photoId) {
      return $http.put(Main.get('/api/prompt/' + promptId), {
        photoId: photoId,
      });
    };
    var createNewPrompt = function (obj) {
      return $http.post(MainUrl.get('/api/prompt'), obj);
    };
    return {
      getAllPromptsData: getAllPromptsData,
      getPromptData: getPromptData,
      createNewPrompt: createNewPrompt,
      setPromptWinner: setPromptWinner
    };
  })
  .factory('PhotoFactory', function ($http, MainUrl) {
    var photoFactory = {
      get: function (id) {
        return $http.get(MainUrl.get('/api/photo/' + id));
      }
    };
    return photoFactory;
  })
  .directive('appHeader', function() {
    console.log('APP HEADER');
    return {
      restrict: 'E',
      templateUrl: 'app/templates/app-header.html'
    };
  });