//Displays all prompts to prompts route

angular.module("mlp.prompts", ['ngFx']) //A simple way to add beautiful animations to your angular apps. Animations based off animate.css. 

//$moment is use to parse, validate, manipulate, and display dates in JavaScript.
//PromptFactory and Auth are defined in service/services.js
//The $http service is a core Angular service that facilitates communication with the remote
//HTTP servers via the browser's XMLHttpRequest object or via JSONP.

.controller("promptsController", function ($scope, $http, PromptFactory, Auth, $moment) {
  Auth.isAuth();
  $scope.signOut = Auth.signOut;
  $scope.limitChar = function (string, limit) {
    return (string.length < limit) ? string : string.substr(0, limit) + "...";
  };
  PromptFactory.getAllPromptsData($scope.realPrompts)
    .then(function (res) {
      console.log(res.data);
      var results = res.data;
      _.each(results, function (status) {
        _.each(status, function (prompt) {
          prompt.startTime = moment(prompt.startTime);
          prompt.endTime = moment(prompt.endTime);
          prompt.votingEndTime = moment(prompt.votingEndTime);
        });
      });
      $scope.status = results;
    });
});