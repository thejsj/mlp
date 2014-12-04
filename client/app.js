var app = angular.module('mlp', ['ui-router','ngFx'])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/links');

  $stateProvider
    .state('links', {
      templateUrl: 'app/links/links.html',
      controller: 'LinksController',
      url: '/links',
      animation: {
        enter: 'grow-in',
        leave: 'shrink-out',
        ease: 'back',
        speed: 400
      }
    })
    .state('shorten', {
      templateUrl: 'app/shorten/shorten.html',
      controller: 'ShortenController',
      url: '/shorten',
      animation: {
        enter: 'shrink-in',
        leave: 'grow-out',
        ease: 'back',
        speed: 400
      }
    });

})