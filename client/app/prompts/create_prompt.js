angular.module("mlp.create_prompt", ['ngFx'])

.controller("createPromptController", function ($scope, $http, PromptFactory, Auth, $moment, $state) {
  Auth.isAuth();
  $scope.formData = {
    title: '',
    startTime: moment(),
    endTime: moment().add(4, 'h'),
    votingEndTime: moment().add(6, 'h'),
  };
  $scope.processForm = function () {
    $scope.formData = _.mapValues($scope.formData, function (v) {
      if (typeof v === 'object' && v._isAMomentObject) return v.format('x');
      return v;
    });
    $scope.formData.userId = Auth.getUserId();
    PromptFactory.createNewPrompt($scope.formData)
      .then(function () {
        $state.go('prompts');
      });
  };
});