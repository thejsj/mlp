angular.module("mlp.prompts", ['ngFx'])

.controller("promptsController", function ($scope, $http, PromptFactory, Auth) {
  Auth.isAuth();
  var dummyPrompts = [{
    id: 1,
    title: "A dog that looks like it's smiling but really isn't.",
    winner_id: 2,
    startTime: '1234',
    endTime: '1234',
    votingEndTime: '1 hour'
  }, {
    id: 2,
    title: "A picture of the best chocolate bar ever.",
    startTime: '1234',
    endTime: '1234',
    votingEndTime: '1 hour'
  }, {
    id: 3,
    title: "Goofiest face contest.",
    startTime: '1234',
    endTime: '1234',
    votingEndTime: '1 hour'
  }, {
    id: 4,
    title: "Men in high heels.",
    startTime: '1234',
    endTime: '1234',
    votingEndTime: '1 hour'
  }, ];

  $scope.limitChar = function (string, limit) {
    return string.substr(0, limit) + "...";
  };
  $scope.prompts = dummyPrompts;
  $http.get('api/prompt').success(function (data) {
    $scope.prompts = data;
  });
  //PromptFactory.getAllPromptsData($scope.realPrompts)
});