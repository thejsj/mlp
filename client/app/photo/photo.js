angular.module("mlp.photo", ['ngFx'])

.controller("photoController", function ($scope, Auth, PhotoFactory, PromptFactory, $state) {
  Auth.isAuth();
  $scope.id = $state.params.id;
  $scope.photo = {};
  $scope.setWinner = function () {
    PromptFactory.setPromptWinner($scope.id, $scope.photo.user_id)
      .then(function (res) {
        console.log(res);
      });
  };

  PhotoFactory.get($scope.id)
    .then(function (res) {
      $scope.photo = res.data;
      console.log($scope.photo);
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
  $scope.hideOverlay = true;
  $scope.comments = dummyComments;
});