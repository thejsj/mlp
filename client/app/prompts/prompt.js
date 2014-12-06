angular.module("mlp.prompt", ['ngFx'])

.controller("promptController", function ($scope, $http, PromptFactory, Auth) {
  Auth.isAuth();
  var dummyId = 1;
  var dummyPrompt = {
    title: "A dog that looks like it's smiling but really isn't.",
    user: "Loring",
    duration: "51",
    startTime: "",
    endTime: "",
    winner: "Not Announced",
    photos: [{
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }]
  };
  $scope.postImage = function () {
    console.log("received image in function");
    var file = document.getElementById('file').files[0],
      reader = new FileReader();
    reader.onloadend = function (e) {
      var data = e.target.result;
      // send via $http
    };
    reader.readAsBinaryString(file);
  };
  $scope.prompt = dummyPrompt;
  //this PromptFactory line disabled due to callback/promise problems
  //PromptFactory.getPromptData(dummyId,$scope.prompt);
  //alt version of the function is hardcoded here until more elegant solutions are available
  $http.get('api/prompt').success(function (data) {
    $scope.prompt = data[0];
  });
  $scope.uploadImage = function () {

  };
  $scope.triggerGallery = function () {

  };
});