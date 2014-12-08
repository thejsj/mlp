angular.module("mlp.prompt", ['ngFx'])

.controller("promptController", function ($scope, $http, PromptFactory, Auth, $upload, $moment, $state) {
  Auth.isAuth();
  $scope.id = $state.params.id;
  $scope.dataLoaded = false;
  $scope.prompt = {};
  $scope.userId = Auth.getUserId();
  $scope.onFileSelect = function ($files) {
    var file = $files[0];
    $scope.upload = $upload.upload({
      url: '/api/photo',
      method: 'POST',
      data: {
        prompt_id: $scope.id,
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
  PromptFactory.getPromptData($scope.id)
    .then(function (data) {
      $scope.prompt = data;
      $scope.dataLoaded = true;
    });

  $scope.uploadImage = function () {

  };
  $scope.triggerGallery = function () {

  };
});