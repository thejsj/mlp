angular.module("mlp.photo",['ngFx'])

.controller("photoController", function ($scope){
  console.log("I am the photo controller");

  var dummyPhoto = {
    url: "img/test-photo.jpg",
    author: "Loring"
  }

  $scope.photo = dummyPhoto;

})

.controller("commentController", function($scope){
  console.log("I am the comment controller");
  
  var dummyComments = [
    {author: "Dustin", text: "Looks like a dog."},
    {author: "Brian", text: "The prompt was that you were supposed to get a picture of a Butterfinger bar."},
    {author: "Loring", text: "This is stupid."},
    {author: "Jorge", text: "I'm leaving this group....more like Silver Octo-loser."},
    {author: "Loring", text: "Ok bye"}
  ]

    $scope.hideOverlay = true;
    $scope.comments = dummyComments;
  

})

;
