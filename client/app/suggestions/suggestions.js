//Controller for suggestions.js makes sure the user is authorized to view and if not redirects them to the log in

angular.module("mlp.suggestions", ['ngFx'])

.controller("suggestionsController", function ($scope, Auth) {
  Auth.isAuth();
});