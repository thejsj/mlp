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

  $scope.postImage = function() {
  	var file = document.getElementById('file').files[0];
	  var reader = new FileReader();
	  reader.onloadend = function(e){
	    var data = e.target.result;
      console.log('POST /api/photo');
	    $http.post('/api/photo', {
        image: data,
        prompt_id: 1,
        userId: 1,
      })
        .then(function (res) {
          console.log('res');
	        console.log(res);
	      })
        .catch(function(err){
          console.log('err');
          console.log(err);
        })
	  }
	  reader.readAsBinaryString(file);
  }

  $scope.prompt = dummyPrompt;

  
  PromptFactory.getPromptData(dummyId)
    .then(function (data) {
      $scope.prompt = data;
    })

  $scope.uploadImage = function () {

  };
  $scope.triggerGallery = function () {

  };
});