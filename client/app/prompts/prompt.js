angular.module("mlp.prompt", ['ngFx'])

.controller("promptController", function ($scope, $http, PromptFactory, Auth, $upload, $moment, $state) {
  Auth.isAuth();
  console.log("loading up promptcontroller");
  $scope.id = $state.params.id;
  $scope.dataLoaded = false;
  $scope.prompt = {};
  $scope.userId = Auth.getUserId();
  $scope.userPhotoSubmission = undefined;
  $scope.submissionPeriodIsOpen = false;
  
  $scope.onFileSelect = function ($files) {
    var file = $files[0];
    console.log("uploading photo...")
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
        $state.reload();
    }).error(function (err) {
      console.log('ERROR:', err);
    });
  };
  
  PromptFactory.getPromptData($scope.id)
    .then(function (data) {
      $scope.prompt = data;
      console.log(data);
      $scope.dataLoaded = true;
      return true;
      console.log($scope.prompt);
    }).then(function (bool){
      $scope.userPhotoSubmission = $scope.checkForSubmissionByCurrentUser();
      return true;
    }).then(function (bool){
      $scope.submissionPeriodIsOpen = $scope.checkIfSubmissionPeriodIsOpen();
      return true;
    });

  //if current user has submitted a photo for this prompt, returns signature of that photo.
  $scope.checkForSubmissionByCurrentUser = function(){
    var photos = $scope.prompt.photos;
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      if(photo.user_id===$scope.userId){
        console.log("user has submitted: ", photo)
        return photo;
      }
    };
    console.log("user has not submitted a photo.")
    return undefined;
  }

  //returns true if submission period is still active; otherwise returns false.
  $scope.checkIfSubmissionPeriodIsOpen = function(){
    return($scope.prompt.endTime>Date.now());
  }

});