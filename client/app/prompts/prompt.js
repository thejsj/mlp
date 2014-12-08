angular.module("mlp.prompt", ['ngFx'])

.controller("promptController", function ($scope, $http, PromptFactory, Auth, $upload, $moment) {
  Auth.isAuth();
  var dummyId = 1;

  $scope.onFileSelect = function ($files) {
    var file = $files[0];
    $scope.upload = $upload.upload({
      url: '/api/photo',
      method: 'POST',
      data: {
        prompt_id: 1,
        user_id: Auth.getUserId(),
      },
      file: file,
    }).progress(function (evt) {
      // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
    }).success(function (data, status, headers, config) {
      // Update Controller
    }).error(function (err) {
      console.log('ERROR:', err);
    });
  };

  //TODO: take out dummyID here and instead make it fetch the proper prompt
  //and its data.  question: how does it know which prompt_id to request?
  PromptFactory.getPromptData(dummyId)
    .then(function (data) {
      data.votingEndTime = $moment(data.votingEndTime, 'mm').fromNow();
      $scope.prompt = data;
    });

  $scope.uploadImage = function () {

  };
  $scope.triggerGallery = function () {

  };
});