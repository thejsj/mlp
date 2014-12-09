// main angular module.  whole thing is wrapped in an IIFE
// (immediately invoked function expression) to guard against
// errors on startup.


(function () {
  console.log("initializing");
  var app = angular.module('mlp', [
      'ui.router',
      'ngFx',
      'angularFileUpload',
      'angular-momentjs',
      'mlp.loading',
      'mlp.logIn',
      'mlp.signUp',
      'mlp.photo',
      'mlp.create_prompt',
      'mlp.prompt',
      'mlp.prompts',
      'mlp.suggestions',
      'mlp.suggestions_prompts',
      'mlp.services',
    ])
    //routes for rendering the various HTML templates (found in app/*)
    .config(function ($stateProvider, $urlRouterProvider) {
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
          url: '/photo/:id',
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
          url: '/prompt/:id',
          animation: {
            enter: 'shrink-in',
            leave: 'grow-out',
            ease: 'back',
            speed: 400
          }
        })
        .state('suggestions', {
          templateUrl: 'app/suggestions/suggestions.html',
          controller: 'suggestionsController',
          url: '/suggestions',
          animation: {
            enter: 'shrink-in',
            leave: 'grow-out',
            ease: 'back',
            speed: 400
          }
        })
        .state('suggestionsPrompts', {
          templateUrl: 'app/suggestions/suggestions_prompts.html',
          controller: 'suggestionsPromptsController',
          url: '/suggestions-prompts',
          animation: {
            enter: 'shrink-in',
            leave: 'grow-out',
            ease: 'back',
            speed: 400
          }
        })
        .state('createPrompt', {
          templateUrl: 'app/prompts/create_prompt.html',
          controller: 'createPromptController',
          url: '/create-prompt',
          animation: {
            enter: 'shrink-in',
            leave: 'grow-out',
            ease: 'back',
            speed: 400
          }
        });
    });
})();