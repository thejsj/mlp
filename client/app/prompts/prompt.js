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


  //getData();

  $scope.prompt = dummyPrompt;
  PromptFactory.getPromptData(dummyId,$scope.prompt);
 

  $scope.uploadImage = function() {

  }

  $scope.triggerGallery = function() {
    
  }



});