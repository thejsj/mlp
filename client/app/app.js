(function(){
  console.log("initializing");
  var app = angular.module('mlp', 
    ['ui.router',
     'ngFx',
     'mlp.loading',
     'mlp.login',
     'mlp.photo'
     ])

  .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('loading', {
        templateUrl: 'app/loading/loading.html',
        controller: 'loadingController',
        url: '/loading',
        animation: {
          enter: 'grow-in',
          leave: 'shrink-out',
          ease: 'back',
          speed: 400
        }
      })

      .state('photo', {
        templateUrl: 'app/photo/photo.html',
        controller: 'photoController',
        url: '/events',
        animation: {
          enter: 'shrink-in',
          leave: 'grow-out',
          ease: 'back',
          speed: 400
        }
      })

      .state('photoComments', {
        templateUrl: 'app/photo/photoComments.html',
        controller: 'photoController',
        url: '/events',
        animation: {
          enter: 'shrink-in',
          leave: 'grow-out',
          ease: 'back',
          speed: 400
        }
      })

      .state('login', {
        templateUrl: 'app/login/login.html',
        controller: 'loginController',
        url: '/login',
        animation: {
          enter: 'shrink-in',
          leave: 'grow-out',
          ease: 'back',
          speed: 400
        }
      });
  })

.controller('mainController', function($state, $timeout){
  
})



})();