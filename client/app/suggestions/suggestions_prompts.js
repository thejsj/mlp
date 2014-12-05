angular.module("mlp.prompt",['ngFx'])

.controller("promptController", function ($scope){
  console.log("I am the prompt controller");
  
  $scope.prompt = {
  	title : "",
  	creator : "",
  	duration : "",
  	startTime : "",
  	endTime : "",
  	winner : "",
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