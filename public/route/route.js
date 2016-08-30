


(function() {
	angular.module('youtubeportal').config(config);
	config.$inject = [ '$stateProvider', '$urlRouterProvider' ];
	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state("/", {
			url : "/",
			templateUrl : "pages/main.html",
			resolve : {
				mymessages : [
				              'Mainfactory',
				              function(Mainfactory) {
				            	  return Mainfactory
				            	  .LoadYouTubeapplicationData();
				              } ]
			}

		})
		.state("/youtube", {
			url : "/youtube/:id",
			templateUrl : "pages/youtube.html",
			onEnter: [ '$state','$rootScope', function($state,$rootScope){
				if ($rootScope.applicationYouTubeData == undefined && $rootScope.applicationYouTubeData == null) {
					$state.go('/');
				};
			}]

		})
		.state("/training", {
			url : "/training",
			templateUrl : "pages/OnlineTraining.html"
			

		})
		.state("home", {
			url : "/home",
			templateUrl : "pages/main.html",
			resolve : {
				mymessages : [
				              'Mainfactory',
				              function(Mainfactory) {
				            	  return Mainfactory
				            	  .LoadapplicationData();
				              } ]
			}

		})
		.state("all", {
			url : "/all",
			templateUrl : "pages/common.html",
			resolve : {
				mymessages : [
				              'Mainfactory',
				              function(Mainfactory) {
				            	  return Mainfactory
				            	  .LoadapplicationData();
				              } ]
			}

		})
		.state("welcome", {
			url : "/welcome",
			templateUrl : "pages/welcome.html",


		})
		.state("playlists", {
			url : "/playlists",
			templateUrl : "pages/playlists.html",
			resolve : {
				mymessages : [
				              'Mainfactory',
				              function(Mainfactory) {
				            	  return Mainfactory
				            	  .LoadScreenCastData();
				              } ]
			}

		})
		.state("playlists.videos", {
			url : "/videos/:ID",
			templateUrl : "pages/playlistsVideos.html",
			onEnter: [ '$state','$rootScope', function($state,$rootScope){
				if ($rootScope.applicationScreenCastData == undefined && $rootScope.applicationScreenCastData == null) {
					$state.go('/');
				};
			}]

		})
		.state("web", {
			url : "/web",
			templateUrl : "pages/web.html",
			resolve : {
				mymessages1 : [
				               'Mainfactory',
				               function(Mainfactory) {
				            	   return Mainfactory
				            	   .LoadapplicationData();
				               } ]

			}

		})
		.state("DevOps", {
			url : "/DevOps",
			templateUrl : "pages/DevOps.html",
			resolve : {
				mymessages1 : [
				               'Mainfactory',
				               function(Mainfactory) {
				            	   return Mainfactory
				            	   .LoadapplicationData();
				               } ]

			}

		})
		.state("java", {
			url : "/java",
			templateUrl : "pages/java.html",
			resolve : {
				mymessages1 : [
				               'Mainfactory',
				               function(Mainfactory) {
				            	   return Mainfactory
				            	   .LoadapplicationData();
				               } ]

			}

		})
		.state("mobile", {
			url : "/mobile",
			templateUrl : "pages/mobile.html",
			resolve : {
				mymessages1 : [
				               'Mainfactory',
				               function(Mainfactory) {
				            	   return Mainfactory
				            	   .LoadapplicationData();
				               } ]

			}

		})
		.state("all.technology", {
			url : "/:trainingid",
			templateUrl : "pages/common_technology.html",
			resolve : {
				mymessages1 : [
				               'Mainfactory','$stateParams',
				               function(Mainfactory,$stateParams) {
				            	   return Mainfactory
				            	   .getTrainingByTrainingID($stateParams.trainingid);
				               } ]

			}

		})

		.state("all.technology.youtube", {
			url : "/:youtubeid",
			templateUrl : "pages/common_technology_youtube.html",
			resolve : {
				mymessages : [
				              'Mainfactory','$stateParams',
				              function(Mainfactory,$stateParams) {
				            	  return Mainfactory
				            	  .getYouTubeVideosByID($stateParams.youtubeid);
				              } ]
			}

		})

		.state("web.technology.youtube", {
			url : "/:youtube_id",
			templateUrl : "pages/common_technology_youtube.html",

			resolve : {
				mymessages : [
				              'Mainfactory','$stateParams',
				              function(Mainfactory,$stateParams) {
				            	  return Mainfactory
				            	  .getYouTubeVideosByID($stateParams.youtube_id);
				              } ]
			}

		})

		.state("mobile.technology.youtube", {
			url : "/:youtube_id",
			templateUrl : "pages/common_technology_youtube.html",

			resolve : {
				mymessages : [
				              'Mainfactory','$stateParams',
				              function(Mainfactory,$stateParams) {
				            	  return Mainfactory
				            	  .getYouTubeVideosByID($stateParams.youtube_id);
				              } ]
			}

		})
		.state("DevOps.technology.youtube", {
			url : "/:youtube_id",
			templateUrl : "pages/common_technology_youtube.html",

			resolve : {
				mymessages : [
				              'Mainfactory','$stateParams',
				              function(Mainfactory,$stateParams) {
				            	  return Mainfactory
				            	  .getYouTubeVideosByID($stateParams.youtube_id);
				              } ]
			}

		})

		.state("java.technology.youtube", {
			url : "/:youtube_id",
			templateUrl : "pages/common_technology_youtube.html",
			resolve : {
				mymessages : [
				              'Mainfactory','$stateParams',
				              function(Mainfactory,$stateParams) {
				            	  return Mainfactory
				            	  .getYouTubeVideosByID($stateParams.youtube_id);
				              } ]
			}

		})

		.state("web.technology", {
			url : "/:trainingid",
			templateUrl : "pages/web_technology.html",

			resolve : {
				mymessages1 : [
				               'Mainfactory','$stateParams',
				               function(Mainfactory,$stateParams) {
				            	   return Mainfactory
				            	   .getTrainingByTrainingID($stateParams.trainingid);
				               } ]

			}

		})
		.state("DevOps.technology", {
			url : "/:trainingid",
			templateUrl : "pages/DevOps_technology.html",

			resolve : {
				mymessages1 : [
				               'Mainfactory','$stateParams',
				               function(Mainfactory,$stateParams) {
				            	   return Mainfactory
				            	   .getTrainingByTrainingID($stateParams.trainingid);
				               } ]

			}

		})

		.state("java.technology", {
			url : "/:trainingid",
			templateUrl : "pages/java_technology.html",
			resolve : {
				mymessages1 : [
				               'Mainfactory','$stateParams',
				               function(Mainfactory,$stateParams) {
				            	   return Mainfactory
				            	   .getTrainingByTrainingID($stateParams.trainingid);
				               } ]

			}

		})
		.state("mobile.technology", {
			url : "/:trainingid",
			templateUrl : "pages/mobile_technology.html",
			resolve : {
				mymessages1 : [
				               'Mainfactory','$stateParams',
				               function(Mainfactory,$stateParams) {
				            	   return Mainfactory
				            	   .getTrainingByTrainingID($stateParams.trainingid);
				               } ]

			}

		})

		.state(
				"login",
				{
					url : "/login",
					templateUrl : "partials/auth/login.html",
					onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
						if (AuthenticationService.isLoggedIn()) {
							$state.go('all');
						};
					}]
				})
				.state("signout", {
					url : "/signout",
					templateUrl : "pages/main.html"
				})
				.state(
						"password",
						{
							url : "/password",
							templateUrl : "partials/auth/forgotpassword.html",
							onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
								if (AuthenticationService.isLoggedIn()) {
									$state.go('home');
								};
							}]

						})
						.state(
								"changepassword",
								{
									url : "/changepassword/:email/:token",
									templateUrl : "partials/auth/changepassword.html"
								})
								.state(
										"register",
										{
											url : "/register",
											templateUrl : "partials/auth/register.html",
											onEnter: [ '$state', 'AuthenticationService', function($state, AuthenticationService){
												if (AuthenticationService.isLoggedIn()) {
													$state.go('welcome');
												};
											}]
										})

										.state("createTraining", {
											url : "/createTraining",
											templateUrl : "pages/createTraining.html"

										})
										.state("createDiscussion", {
											url : "/createDiscussion",
											templateUrl : "pages/createDiscussion.html",
											resolve : {
												mymessages : [
												              'Mainfactory','$stateParams',
												              function(Mainfactory,$stateParams) {
												            	  return Mainfactory
												            	  .LoadAllDiscussions();
												              } ]
											}

										})
										.state("createDiscussion.addDiscussionvideo", {
											url : "/addDiscussionvideo/:id",
											templateUrl : "pages/addDiscussionvideo.html"

										})
										.state("createDiscussion.addDiscussionAuthor", {
											url : "/addDiscussionAuthor/:id",
											templateUrl : "pages/addDiscussionAuthor.html"

										});
				$urlRouterProvider.otherwise("/");

	}

	angular
	.module('youtubeportal')
	.run([
	      '$rootScope',
	      '$location',
	      '$stateParams',
	      '$http',
	      '$state',
	      '$q',
	      'AuthenticationService',
	      function ($rootScope, $location, $stateParams, $http, $state, $q, AuthenticationService) {   

	    	  $rootScope.$on( '$stateChangeStart',function (event, toState, toParams,fromState, fromParams) {

	    		  $(".page-loading").removeClass("hidden");

	    	  });
	    	  $rootScope.$on('$stateChangeError', function (event,toState, toParams, fromState, fromParams) {
	    		  $(".page-loading").addClass("hidden");
	    	  });
	    	  $rootScope.$on( '$stateChangeSuccess',function (event, toState, toParams, fromState, fromParams) {
	    		  $rootScope.loading = false;
	    		  // get user name on route change success
	    		  $rootScope.isLoggedIn = AuthenticationService.isLoggedIn();
	    		  $rootScope.currentUser = AuthenticationService.getCurrentUser();
	    		  if ($rootScope.currentUser) {
	    			  $rootScope.currentUserName = $rootScope.currentUser.firstname;
	    		  }
	    		  console.log($rootScope.currentUser);
	    		  $(".page-loading").addClass("hidden");


	    	  });

	      }]);
})();



