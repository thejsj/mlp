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