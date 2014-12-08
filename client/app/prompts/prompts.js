angular.module("mlp.prompts", ['ngFx'])

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