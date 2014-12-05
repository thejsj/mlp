angular.module("mlp.signUp",[])

.controller("signUpController", function ($scope, Auth){
  console.log("I am the signup controller");

  $scope.submitCredentials = function(){
    var credentials = {
      email: $scope.email,
      password: $scope.password
    };
    //send creds to server
    console.log("submitting credentials: " + $scope.email + " " + $scope.password);
    Auth.signUp(credentials);
  };
});