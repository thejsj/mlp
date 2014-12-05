angular.module("mlp.signup",[])

.controller("signUpController", function ($scope){
  console.log("I am the signup controller");

  $scope.submitCredentials = function(){
    var credentials = {
      username: $scope.username,
      password: $scope.password
    };
    //send creds to server
    console.log("submitting credentials: " + $scope.username + " " + $scope.password);
  };
});