(function () {
	'use strict';

	angular
	.module ( 'youtubeportal' )
	.factory ( 'Mainfactory', Mainfactory );

	Mainfactory.$inject = [ '$rootScope','$q','$http','$stateParams' ];
	function Mainfactory ( $rootScope,$q,$http,$stateParams ) {
		var Mainfactory = {};

		Mainfactory.LoadapplicationData = LoadapplicationData;
		Mainfactory.LoadYoutubeData = LoadYoutubeData;
		Mainfactory.LoadapplicationDataOneTechnology = LoadapplicationDataOneTechnology;
		Mainfactory.LoadYoutubeDataOneTechnology = LoadYoutubeDataOneTechnology;
		Mainfactory.LoadYoutubeDataOneCourse = LoadYoutubeDataOneCourse;


		return Mainfactory;
		function LoadapplicationData ()
		{
			var deferred = $q.defer();
			if ($rootScope.applicationData) {
				return true;
			} else {
				$http.get(
					'/api/getAllTraining')
				.success(function(response) {
					deferred.resolve(response);
					$rootScope.applicationData = response;

				}).error(function(error) {
						// Handle error case
						deferred.reject(error);
					});
				return deferred.promise;
			}
		}
		function LoadYoutubeData()
		{
			var deferred = $q.defer();
			if ($rootScope.YouTubeData) {
				return true;
			} else {
				$http.get(
					'/api/getAllYouTubeVideos')
				.success(function(response) {
					deferred.resolve(response);
					$rootScope.YouTubeData = response;

				}).error(function(error) {
						// Handle error case
						deferred.reject(error);
					});
				return deferred.promise;
			}

		}
		function LoadapplicationDataOneTechnology(course_id)
		{
			var deferred = $q.defer();

			$http.get(
				'/api/getAllTrainingByTechnologyName/'+ course_id)
			.success(function(response) {
				deferred.resolve(response);
				$rootScope.applicationDataOneTech = response;

			}).error(function(error) {
						// Handle error case
						deferred.reject(error);
					});
			return deferred.promise;


		}
		function LoadYoutubeDataOneTechnology(course_id)
		{
			var deferred = $q.defer();

			$http.get(
				'/api/getAllYouTubeVideosByTechnologyName/'+course_id)
			.success(function(response) {
				deferred.resolve(response);
				$rootScope.YouTubeDataOneTech = response;

			}).error(function(error) {
						// Handle error case
						deferred.reject(error);
					});
			return deferred.promise;
		}
		function LoadYoutubeDataOneCourse(youtube_id)
		{
			var deferred = $q.defer();

			$http.get(
				'/api/getYouTubeVideosByCourseId/'+youtube_id)
			.success(function(response) {
				deferred.resolve(response);
				$rootScope.YouTubeDataOneCourse= response;

			}).error(function(error) {
							// Handle error case
							deferred.reject(error);
						});
			return deferred.promise;
		}

	}
}) ();




