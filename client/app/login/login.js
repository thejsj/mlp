//Controller for login.html, collects email and password and checks to make sure they're an existing user

angular.module("mlp.logIn", [])

.controller("logInController", function ($scope, Auth) {
  Auth.isAuth(true);
  $scope.submitCredentials = function () {
    var credentials = {
      email: $scope.email,
      password: $scope.password
    };
    Auth.logIn(credentials);
  };
});