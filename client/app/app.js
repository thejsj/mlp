(function(){
  console.log("initializing");
  var app = angular.module('mlp', 
    ['ui.router',
     'ngFx',
     'mlp.loading',
     'mlp.login',
     'mlp.signup',
     'mlp.photo',
     'mlp.prompt',
     'mlp.prompts',
     'mlp.services'
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

      .state('signUp', {
        templateUrl: 'app/signUp/signUp.html',
        controller: 'signUpController',
        url: '/signUp',
        animation: {
          enter: 'shrink-in',
          leave: 'grow-out',
          ease: 'back',
          speed: 400
        }
      })

      .state('logIn', {
        templateUrl: 'app/login/login.html',
        controller: 'logInController',
        url: '/login',
        animation: {
          enter: 'shrink-in',
          leave: 'grow-out',
          ease: 'back',
          speed: 400
        }
      })

      .state('photo', {
        templateUrl: 'app/photo/photo.html',
        controller: 'photoController',
        url: '/photo',
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
        url: '/photo',
        animation: {
          enter: 'shrink-in',
          leave: 'grow-out',
          ease: 'back',
          speed: 400
        }
      })

      .state('prompts', {
        templateUrl: 'app/prompts/prompts.html',
        controller: 'promptsController',
        url: '/prompts',
        animation: {
          enter: 'shrink-in',
          leave: 'grow-out',
          ease: 'back',
          speed: 400
        }
      })

      .state('prompt', {
        templateUrl: 'app/prompts/prompt.html',
        controller: 'promptController',
        url: '/prompt',
        animation: {
          enter: 'shrink-in',
          leave: 'grow-out',
          ease: 'back',
          speed: 400
        }
      })

  })

.controller('mainController', function($state, $timeout){
  
})



})();