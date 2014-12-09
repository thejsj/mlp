//Controller for signUp.html, submits credentials to server

angular.module("mlp.signUp", [])

.controller("signUpController", function ($scope, Auth) {
  Auth.isAuth(true, false);
  $scope.submitCredentials = function () {
    var credentials = {
      email: $scope.email,
      password: $scope.password
    };
    //send creds to server
    Auth.signUp(credentials);
  };
});