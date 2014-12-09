angular.module("mlp.prompt", ['ngFx'])

.controller("promptController", function ($scope, $http, PromptFactory, Auth, $upload, $moment, $state, $window) {
  Auth.isAuth();
  console.log("loading up promptcontroller");
  $scope.id = $state.params.id;
  $scope.dataLoaded = false;
  $scope.prompt = {};
  $scope.userId = Auth.getUserId();
  $scope.userPhotoSubmission = undefined;
  $scope.submissionPeriodIsOpen = false;
  $scope.photoTaken = false;

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
      $state.reload();
    }).error(function (err) {
      console.log('ERROR:', err);
    });
  };

  PromptFactory.getPromptData($scope.id)
    .then(function (data) {
      $scope.prompt = data;
      console.log('$scope.prompt');
      console.log($scope.prompt);
      $scope.dataLoaded = true;
      return true;
    }).then(function (bool) {
      $scope.userPhotoSubmission = $scope.checkForSubmissionByCurrentUser();
      return true;
    }).then(function (bool) {
      $scope.submissionPeriodIsOpen = $scope.checkIfSubmissionPeriodIsOpen();
      return true;
    });

  //if current user has submitted a photo for this prompt, returns signature of that photo.
  $scope.checkForSubmissionByCurrentUser = function () {
    var photos = $scope.prompt.photos;
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      if (photo.user_id === $scope.userId) {
        console.log("user has submitted: ", photo);
        return photo;
      }
    }
    console.log("user has not submitted a photo.");
    return undefined;
  };

  //returns true if submission period is still active; otherwise returns false.
  $scope.checkIfSubmissionPeriodIsOpen = function () {
    return ($scope.prompt.endTime > Date.now());
  };


  $scope.startCamera = function () {
    console.log('Start Camera');
    // Grab elements, create settings, etc.
    var canvas = document.getElementById("canvas"),
      context = canvas.getContext("2d"),
      video = document.getElementById("video"),
      videoObj = {
        "video": true
      },
      errBack = function (error) {
        console.log("Video capture error: ", error.code);
      };

    // Put video listeners into place
    if (navigator.getUserMedia) { // Standard
      navigator.getUserMedia(videoObj, function (stream) {
        video.src = stream;
        video.play();
      }, errBack);
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
      navigator.webkitGetUserMedia(videoObj, function (stream) {
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
      }, errBack);
    } else if (navigator.mozGetUserMedia) { // Firefox-prefixed
      navigator.mozGetUserMedia(videoObj, function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      }, errBack);
    }

    document.getElementById("snap").addEventListener("click", function () {
      $scope.photoTaken = true;
      context.drawImage(video, 0, 0, 230, 173);
      var image = new Image();
      var canvas = document.getElementById("canvas");
      image.src = canvas.toDataURL("image/png");
      // Upload Image
      $scope.upload = $upload.upload({
        url: '/api/photo',
        method: 'POST',
        data: {
          prompt_id: $scope.id,
          user_id: Auth.getUserId(),
          image_data: image.src
        },
      }).progress(function (evt) {
        // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function (data, status, headers, config) {
        $state.reload();
      }).error(function (err) {
        console.log('ERROR:', err);
      });
    });
  };
  setTimeout($scope.startCamera, 1000);
});