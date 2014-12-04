var app = angular.module('mlp', ['ui-router','ngFx'])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/links');

  $stateProvider
    .state('loading', {
      templateUrl: 'templates/loading.html',
      controller: 'loadingController',
      url: '/loading',
      animation: {
        enter: 'grow-in',
        leave: 'shrink-out',
        ease: 'back',
        speed: 400
      }
    })
    .state('events', {
      templateUrl: 'templates/events.html',
      controller: 'eventsController',
      url: '/events',
      animation: {
        enter: 'shrink-in',
        leave: 'grow-out',
        ease: 'back',
        speed: 400
      }
    });
    .state('event', {
      templateUrl: 'templates/event.html',
      controller: 'eventController',
      url: '/event',
      animation: {
        enter: 'shrink-in',
        leave: 'grow-out',
        ease: 'back',
        speed: 400
      }
    });
    .state('login', {
      templateUrl: 'templates/login.html',
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