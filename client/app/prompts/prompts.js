angular.module("mlp.prompts", ['ngFx'])

.controller("promptsController", function ($scope, $http, PromptFactory, Auth, $moment) {
  Auth.isAuth();
  $scope.signOut = Auth.signOut;
  $scope.limitChar = function (string, limit) {
    return string.substr(0, limit) + "...";
  };
  PromptFactory.getAllPromptsData($scope.realPrompts)
    .then(function (res) {
      $scope.prompts = res.data;
      _.each($scope.prompts, function (prompt) {
        prompt.startTime = moment(prompt.startTime);
        prompt.endTime = moment(prompt.endTime);
        prompt.votingEndTime = moment(prompt.votingEndTime);
      });
    });
});