(function () {
	'use strict';

	angular
	.module('youtubeportal')
	.factory('AuthenticationService', AuthenticationService);

	AuthenticationService.$inject = ['$http', '$rootScope', '$timeout', 'UserService', '$window'];
	function AuthenticationService($http, $rootScope, $timeout, UserService , $window) {
		this.user = window.user;

		var service = {};
		service.user = this.user;
		service.isLoggedIn = isLoggedIn;
		service.getCurrentUser = getCurrentUser;
		return service;

		function isLoggedIn() {
			if (this.user) {
				return true;
			} else {
				return false;
			}
		}

		function getCurrentUser(){
			if (this.user) {
				return this.user;
			}
		}

	}



})();
