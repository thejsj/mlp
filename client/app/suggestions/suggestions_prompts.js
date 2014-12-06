angular.module("mlp.suggestions_prompts", ['ngFx'])

.controller("suggestionsPromptsController", function ($scope, Auth) {
  Auth.isAuth();
});