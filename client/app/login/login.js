angular.module("mlp.logIn",[])

.controller("logInController", function ($scope, Auth){
  console.log("I am the login controller");

  $scope.submitCredentials = function(){
    var credentials = {
      username: $scope.username,
      password: $scope.password
    };
    console.log("submitting credentials: " + $scope.username + " " + $scope.password);
    
    Auth.logIn(credentials);
    //send credentials to to server
    //do some rerouting stuff based on response
  }

});