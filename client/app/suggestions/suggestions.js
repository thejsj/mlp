angular.module("mlp.suggestions", ['ngFx'])

.controller("suggestionsController", function ($scope, Auth) {
  Auth.isAuth();
});