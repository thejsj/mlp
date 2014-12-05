angular.module("mlp.prompt",['ngFx'])

.controller("promptController", function ($scope, $http){
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
          photo : "",
          user : ""
      },
      {
          photo : "",
          user : ""
      },
      {
          photo : "",
          user : ""
      },
      {
          photo : "",
          user : ""
      },
      {
          photo : "",
          user : ""
      },
      {
          photo : "",
          user : ""
      },
      {
          photo : "",
          user : ""
      }]
  };

  var getData = function() {
   console.log("getting photo data from server")
    return $http.get('/api/prompt')
    .then(function (res) {
      console.log(res.body);
    });
  };

  $scope.prompt = dummyPrompt;
  //getData();
 

  $scope.uploadImage = function() {

  }

  $scope.triggerGallery = function() {
  	
  }




});