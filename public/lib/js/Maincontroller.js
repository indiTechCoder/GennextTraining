/* bootstrap  Angular app for fetching common resources
 * removed ng-app from index page to use manual bootstrap
 * @ bootstrap module added
 */
 (function () {
 	'use strict';
angular.module('youtubeportal')
.controller(
	"parentCntl",
	[
	"$scope",
	"$rootScope",
	'resourceData',

	function parentCntl($scope, $rootScope,resourceData) {

		$rootScope.resourceData = resourceData;
		console.log($rootScope.resourceData);

		$scope.submitVideo = function(form)
		{
			console.log($scope.training);

			if(form.$invalid)
			{
				$scope.videoSubmitted = true;
				return;
			}
			$http.post(
				'/api/createYouTubeVideo',$scope.video)
			.success(function(response) {

				console.log("SUCCESS");
				alert("added");

			}).error(function(error) {
													// Handle error case

												});

		}
		$scope.createTraining = function(form)
		{
			if(form.$invalid)
			{
				alert("invalid..");
				$scope.trainingSubmitted = true;
				return;
			}
			$http.post(
				'/api/createTraining',$scope.training)
			.success(function(response) {
				alert("added");
				console.log("SUCCESS");

			}).error(function(error) {
													// Handle error case

												});
		}


	}]);

angular.module('youtubeportal').controller("Maincontroller",Maincontroller);
Maincontroller.$inject = ['$scope','$rootScope'];
function Maincontroller($scope,$rootScope)

{

	$scope.filter2 = function(data){
		if (data.playlisturl === null || data.playlisturl === '' ){
			return true;
		} else{
			return;
		}
	};


	$scope.getYoutubeUrl = function(jsondata)
	{
		return jsondata.link;
	}
}

angular.module("youtubeportal").filter('trusted', ['$sce', function ($sce) {
	return function(url) {
		return $sce.trustAsResourceUrl(url);
	};
}]);

}) ();
