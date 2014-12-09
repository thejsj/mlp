//Contoroller for suggestions_prompts.  Checks to make sure the user is authorized to view page and if not redirects them to the loggin page.

angular.module("mlp.suggestions_prompts", ['ngFx'])

.controller("suggestionsPromptsController", function ($scope, Auth) {
  Auth.isAuth();
});