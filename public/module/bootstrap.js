/* bootstrap  Angular app for fetching common resources
 * removed ng-app from index page to use manual bootstrap
 * @ bootstrap module added
 */

/* bootstrap  Angular app for fetching common resources
 * removed ng-app from index page to use manual bootstrap
 * @ bootstrap module added
 */
(function () {
	'use strict';
	var myApplication = angular.module('youtubeportal', [ 'ui.router','ngCookies','ngResource'])
	var initInjector = angular.injector([ "ng" ]);
	var $http = initInjector.get("$http");

	angular
	.element(document)
	.ready(
			function() {
				$http.get('/api/getAllTraining')
				.then(
						function(response) {
							myApplication.constant("resourceData",
									response.data);
							angular.bootstrap(document,
									[ "youtubeportal" ]);
						}, function(errorResponse) {
							// Handle error case
						});

			});

	//to handle Facebook URL
	if (window.location.hash === '#_=_')
		window.location.hash = '#!';

	//For Google seo route url
	myApplication.config(['$locationProvider', function ($locationProvider) {
		$locationProvider.hashPrefix('!');
	}]);

	myApplication
	.controller(
			"parentCntl",
			[
			 "$scope",
			 "$rootScope",
			 "$state",
			 "$http",
			 "AuthenticationService",
			 "USER_ROLES",
			 '$timeout',
			 function parentCntl( $scope, $rootScope, $state,
					 $http,AuthenticationService,USER_ROLES,$timeout) {

				 $scope.currentUser = null;
				 $scope.userRoles = USER_ROLES;


			 } ])
			 .constant('AUTH_EVENTS', {
				 loginSuccess: 'auth-login-success',
				 loginFailed: 'auth-login-failed',
				 logoutSuccess: 'auth-logout-success',
				 sessionTimeout: 'auth-session-timeout',
				 notAuthenticated: 'auth-not-authenticated',
				 notAuthorized: 'Provided Credentials are not valid',
				 loginmessage: ' invalid userid and password',
				 registermessagesuccess: 'Successfully registered Please check and activate your account',
				 registermessageerror : 'User Already Exist with Username Provided',
				 resetmessage: 'Reset password will be sent to your registered email id please check your email'
			 })
			 .constant('USER_ROLES', {
				 all: '*',
				 admin: 'admin',
				 guest: 'guest',
				 host: 'host'
			 });

})();





