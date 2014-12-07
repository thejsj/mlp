angular.module("mlp.prompt", ['ngFx'])

.controller("promptController", function ($scope, $http, PromptFactory, Auth, $upload) {
  Auth.isAuth();
  var dummyId = 1;
  var dummyPrompt = {
    title: "A dog that looks like it's smiling but really isn't.",
    user: "Loring",
    duration: "51",
    startTime: "",
    endTime: "",
    winner: "Not Announced",
    photos: [{
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }, {
      filename: "test-photo.jpg",
      user: ""
    }]
  };

  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    // for (var i = 0; i < $files.length; i++) {
      var file = $files[0];
      $scope.upload = $upload.upload({
        url: '/api/photo', //upload.php script, node.js route, or servlet url
        method: 'POST',
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        data: {
          prompt_id: 1,
          userId: 1,
        },
        file: file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Desposition'), server side file variable name. 
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      });
      //.error(...)
      //.then(success, error, progress); 
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    // }
  }

  // $scope.postImage = function() {
  // 	var file = document.getElementById('file').files[0];
	 //  var reader = new FileReader();
	 //  reader.onloadend = function(e){
	 //    var data = e.target.result;
  //     console.log('POST /api/photo');
	 //    $http.post('/api/photo', {
  //       image: data,
  //       prompt_id: 1,
  //       userId: 1,
  //     })
  //       .then(function (res) {
  //         console.log('res');
	 //        console.log(res);
	 //      })
  //       .catch(function(err){
  //         console.log('err');
  //         console.log(err);
  //       })
	 //  }
	 //  reader.readAsBinaryString(file);
  // }

  $scope.prompt = dummyPrompt;

  
  PromptFactory.getPromptData(dummyId)
    .then(function (data) {
      console.log(data);
      $scope.prompt = data;
    })

  $scope.uploadImage = function () {

  };
  $scope.triggerGallery = function () {

  };
});