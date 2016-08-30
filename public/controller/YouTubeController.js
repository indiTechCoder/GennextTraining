/* bootstrap  Angular app for fetching common resources
 * removed ng-app from index page to use manual bootstrap
 * @ bootstrap module added
 */
(function () {
	'use strict';
	angular.module('youtubeportal')
	.directive('bindHtmlCompile', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				scope.$watch(function () {
					return scope.$eval(attrs.bindHtmlCompile);
				}, function (value) {
					element.html(value);
					$compile(element.contents())(scope);
				});
			}
		};
	}])
	.filter('strLimit', [ '$filter', function($filter) {
		return function(input, limit) {
			if (!input)
				return;
			if (input.length <= limit) {
				return input;
			}

			return $filter('limitTo')(input, limit) + '...';
		};
	}])
	.controller(
			"YouTubeController",
			[
			 "$scope",
			 "$rootScope",
			 'resourceData',
			 '$http',
			 '$stateParams',
			 function YouTubeController($scope, $rootScope,resourceData,$http,$stateParams) {
				 this.filteredData = null;
				 this.filterYouTubeData = function(){
					 this.filteredData  = $rootScope.applicationYouTubeData.filter(function(item){
						 return item.ID == $stateParams.id

					 });
					 if(this.filteredData != null){
						 this.tubeurl ="https://www.youtube.com/embed/"+ this.filteredData[0].ID+ "?list="+this.filteredData[0].WelcomeVideoId;
					 }
					 console.log(this.filteredData );

				 }


			 }]);


}) ();
