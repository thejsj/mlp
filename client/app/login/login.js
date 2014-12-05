angular.module("mlp.logIn",[])

.controller("logInController", function ($scope, Auth){
  console.log("I am the login controller");

  $scope.submitCredentials = function(){
    var credentials = {
      email: $scope.email,
      password: $scope.password
    };
    console.log("submitting credentials: " + $scope.email + " " + $scope.password);
    
    Auth.logIn(credentials);
    



    
    //send credentials to to server
    
    //do some rerouting stuff based on response


  }

});