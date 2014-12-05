angular.module("mlp.prompt",['ngFx'])

.controller("promptController", function ($scope){
  console.log("I am the prompt controller");
  
  $scope.prompt = {
  	id : 1,
  	title : "A dog that looks like it's smiling but really isn't.",
  	email : "loringdodge@yahoo.com",
  	votingEndTime : "432",
  	startTime : "1234",
  	endTime : "4321",
  	winner : "Not Announced",
  	photos : [{
  			id : 1,
  	  		filename : 'test-photo.jpg',
  		},
  		{
  			id : 2,
  	  		filename : 'test-photo.jpg',  		},
  		{
  			id : 3,
  	  		filename : 'test-photo.jpg',
  		},
  		{
  			id : 4,
  	  		filename : 'test-photo.jpg',
  		},
  		{
  			id : 5,
  	  		filename : 'test-photo.jpg',
  		},
  		{
  			id : 6,
  	  		filename : 'test-photo.jpg',
  		},
  		{
  			id : 7,
  	  		filename : 'test-photo.jpg',
  		}]
  };

  $scope.uploadImage = function() {

  }

  $scope.triggerGallery = function() {
  	
  }




});