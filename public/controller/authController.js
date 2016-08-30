(function () {
	'use strict';

	angular
	.module('youtubeportal')
	.controller('authController', authController);

	authController.$inject = ['$location','AuthenticationService','$scope','$rootScope','Logins','Registers','$http','$state','AUTH_EVENTS']; 

	function authController($location,AuthenticationService,$scope,$rootScope, Logins,Registers, $http, $state,AUTH_EVENTS) {
		$scope.user = {};

		//login 
		$scope.login = function (form) {
			$scope.loginMessage = '';
			$scope.registerMessage = '';
			if (form.$invalid) {
				$scope.loginsubmitted = true;
				return;
			}
			$(".page-loading")
			.removeClass("hidden");
			var login = new Logins($scope.user);
			login.$save().then(
					function (user) {
						$(".page-loading").addClass("hidden");
						window.location.href = "/";
					}, 
					function (err) {
						$(".page-loading").addClass("hidden");
						$scope.loginMessage = err.data;
						console.log(err);
					});
		}

		$scope.socialLogin = function(social){
			if(social === "fb"){
				window.location = 'oauth/facebook';
			}  
			else{
				window.location = 'oauth/google';
			}

		}

		//Reset Password
		$scope.resetPassword = function (form) {
			if (form.$invalid) {
				$scope.resetsubmitted = true;
				return;
			}
			$(".page-loading").removeClass("hidden");

			$http.post('/user/sendpasswordresetmail', { email : $scope.user.email }).then(function (data) {
				$scope.resetMessage = data.data;
				console.log(data);
				$(".page-loading").addClass("hidden");
			}, function (err) {
				console.log(err);
				$scope.resetMessage = err.data;
				$(".page-loading").addClass("hidden");
			});


		};

		//Change Password
		$scope.changePassword = function (form) {
			console.log("token - " + $state.params.token);
			if (form.$invalid || $scope.user.newpassword2 != $scope.user.newpassword1) {
				$scope.changepasswordsubmitted = true;
				return;
			}
			$(".page-loading").removeClass("hidden");
			$http.post('/user/resetpassword', { password : $scope.user.newpassword1,email : $state.params.email, token : $state.params.token}).then(function (data) {
				$scope.successmessage = data.data;
				$scope.user = {};
				console.log(data);
				$(".page-loading").addClass("hidden");
			}, function (err) {
				console.log(err);
				$scope.loginerrormessage = err.data;
				$(".page-loading").addClass("hidden");
			});


		};

		$scope.regFormflag = false;
		$scope.showRegisterForm = function(){
			$scope.regFormflag = ! $scope.regFormflag;
		} 
		$scope.user = {};
		$scope.register = function (form) {
			$scope.loginMessage = '';
			$scope.registerMessage = '';
			if (form.$invalid) {
				$scope.registersubmitted = true;
				return;
			}
			$(".page-loading")
			.removeClass("hidden");
			var register = new Registers($scope.user);
			register.$save().then(
					function (user) {
						if(user.is_email_verified == false  && user.is_email_verified != undefined){
							$(".page-loading").addClass("hidden");
							$scope.registerMessage = AUTH_EVENTS.registermessagesuccess;
						}else{
							$(".page-loading").addClass("hidden");
							$scope.registerMessage = AUTH_EVENTS.registermessageerror;
						}

					}, 
					function (err) {
						$(".page-loading").addClass("hidden");
						$scope.registerMessage = err.error;
						console.log(err);
					});
		}


		//SignOut
		$scope.signOut = function () {
			AuthenticationService.SignOut($scope.user.email, $scope.user.accessToken, function (response) {
				//console.log(response);
			});
		};
	}
})();
