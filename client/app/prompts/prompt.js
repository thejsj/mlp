angular.module("mlp.prompt",['ngFx'])

.controller("promptController", function ($scope, $http, PromptFactory){
  console.log("I am the prompt controller");
  
  var dummyId = 1;
  var dummyPrompt = {
    title : "A dog that looks like it's smiling but really isn't.",
    user : "Loring",
    duration : "51",
    startTime : "",
    endTime : "",
    winner : "Not Announced",
    photos : [{
          filename : "test-photo.jpg",
          user : ""
      },
      {
          filename : "test-photo.jpg",
          user : ""
      },
      {
          filename : "test-photo.jpg",
          user : ""
      },
      {
          filename : "test-photo.jpg",
          user : ""
      },
      {
          filename : "test-photo.jpg",
          user : ""
      },
      {
          filename : "test-photo.jpg",
          user : ""
      },
      {
          filename : "test-photo.jpg",
          user : ""
      }]
  };


  $scope.postImage = function() {
  	console.log("received image in function");
  	var file = document.getElementById('file').files[0],
	  reader = new FileReader();
	  reader.onloadend = function(e){
	    var data = e.target.result;
	    // send via $http
	  }
	  reader.readAsBinaryString(file);
  }

  $scope.prompt = dummyPrompt;
  PromptFactory.getPromptData(dummyId,$scope.prompt);
 

  $scope.uploadImage = function() {

  }

  $scope.triggerGallery = function() {
    
  }



});