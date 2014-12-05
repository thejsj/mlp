angular.module("mlp.login",[])

.controller("logInController", function ($scope){
  console.log("I am the login controller");

  $scope.submitCredentials = function(){
    var credentials = {
      username: $scope.username,
      password: $scope.password
    };
    console.log("submitting credentials: " + $scope.username + " " + $scope.password);
    
    //send credentials to to server
    //do some rerouting stuff based on response
  }

});