angular.module("mlp.prompt",['ngFx'])

.controller("promptController", function ($scope){
  console.log("I am the prompt controller");
  
  $scope.prompt = {
  	id : 1,
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

  $scope.uploadImage = function() {

  }

  $scope.triggerGallery = function() {
  	
  }




});