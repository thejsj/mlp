angular.module("mlp.prompts", ['ngFx'])

.controller("promptsController", function ($scope, $http, PromptFactory, Auth, $moment) {
  Auth.isAuth();
  $scope.limitChar = function (string, limit) {
    return string.substr(0, limit) + "...";
  };
  $http.get('api/prompt').success(function (data) {
    angular.forEach(data, function (prompt) {
      prompt.votingEndTime = $moment(prompt.votingEndTime, 'mm').fromNow();
    });
    $scope.prompts = data;
  });
  //PromptFactory.getAllPromptsData($scope.realPrompts)
});