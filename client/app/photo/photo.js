angular.module("mlp.photo", ['ngFx'])

.controller("photoController", function ($scope, Auth, PhotoFactory, PromptFactory, $state) {
  Auth.isAuth();
  $scope.id = $state.params.id;
  $scope.userId = Auth.getUserId()
  $scope.photo = {};
  $scope.submissionPeriodIsOpen = false;
  $scope.hideOverlay = true;
  
  $scope.setWinner = function () {
    PromptFactory.setPromptWinner($scope.id, $scope.photo.id)
      .then(function (res) {
        console.log(res);
        $state.go('prompt',{id: $scope.photo.prompt_id});
      });
  };

  $scope.checkIfVotingPeriodIsOpen = function(){
    return($scope.photo.prompt.votingEndTime>Date.now());
  }

  PhotoFactory.get($scope.id)
    .then(function (res) {
      $scope.photo = res.data;
      $scope.votingPeriodIsOpen = $scope.checkIfVotingPeriodIsOpen();
      
      console.log("scope.photo:", $scope.photo);
      console.log("scope.id:", $scope.id);
      console.log("scope.votingPeriodIsOpen:", $scope.votingPeriodIsOpen);
    });


  var dummyComments = [{
    author: "Dustin",
    text: "Looks like a dog."
  }, {
    author: "Brian",
    text: "The prompt was that you were supposed to get a picture of a Butterfinger bar."
  }, {
    author: "Loring",
    text: "This is stupid."
  }, {
    author: "Jorge",
    text: "I'm leaving this group....more like Silver Octo-loser."
  }, {
    author: "Loring",
    text: "Time to have fun."
  }, {
    author: "Loring",
    text: "Ok bye"
  }, {
    author: "Loring",
    text: "Time to have fun."
  }, {
    author: "Loring",
    text: "Ok bye"
  }];

  $scope.comments = dummyComments;

});