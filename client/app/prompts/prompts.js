angular.module("mlp.prompts",['ngFx'])

.controller("promptsController", function ($scope){
  console.log("I am the prompts controller");

  var dummyPrompts = [
    {title: "Dustin", startTime: '1234', endTime: '1234', duration: '1 hour'},
    {title: "Loring", startTime: '1234', endTime: '1234', duration: '1 hour'},
    {title: "Brian", startTime: '1234', endTime: '1234', duration: '1 hour'},
    {title: "Jorge", startTime: '1234', endTime: '1234', duration: '1 hour'},
  ];

  $scope.prompts = dummyPrompts;

});