//Controller for create_prompt.html

angular.module("mlp.create_prompt", ['ngFx']) // ngFX is simple way to add beautiful animations to your angular apps

//The createPromptController is responsible for creating the intitial "prompt" or "round" that is voted on.
//Note: 'prompt' and "round" are synonymous.  When we began the project we started calling one play of the game a prompt since the author supplied one
//to start off the game a sugestion.  We switched to round later since it makes it seem more like a game.
//The user gives the prompt a title.  Once the prompt is created users have 4 hours to upload a photo for the prompt after which no more photos can be uploaded for
//that prompt.  Users upload each photo anomously and the author has 6 hours after the creation of the prompt to choose a winner.
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