// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.controller('MainCtrl', function($scope,$ionicPlatform,$ionicLoading) {
	
	$scope.results = [];
	$scope.cordovaReady = false;

	$ionicPlatform.ready(function() {	
		$scope.$apply(function() {
			$scope.cordovaReady = true;
		});
	});

	$scope.selectPicture = function() {
					
		var gotPic = function(fileUri) {

			$scope.pic = fileUri;
			$scope.results = [];

			$ionicLoading.show({template:'Sending to Watson...'});
						
			//So now we upload it
			var options = new FileUploadOptions();
			
			options.fileKey="image";
			options.fileName=fileUri.split('/').pop();
			
			var ft = new FileTransfer();
			ft.upload(fileUri, "http://localhost:3000/uploadpic", function(r) {

				//async call to Node, which calls Watson, which gives us an array of crap
				$scope.$apply(function() {
					$scope.results = JSON.parse(r.response);
				});
				
				$ionicLoading.hide();
				

			}, function(err) {
				console.log('err from node', err);
			}, options);
			
		};
			
		var camErr = function(e) {
			console.log("Error", e);	
		}
		
		navigator.camera.getPicture(gotPic, camErr, {
			sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
			destinationType:Camera.DestinationType.FILE_URI	
		});
			
	};
	
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
