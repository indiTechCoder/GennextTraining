angular.module('youtubeportal').factory('Logins', ['$resource', function ($resource) {
	return $resource('signin/', {
	}, {
		update : {
			method : 'PUT'
		},
		'query': { method: 'GET', isArray: true }
	});
}]);

angular.module('youtubeportal').factory('Registers', ['$resource', function ($resource) {
	return $resource('signup/', {
	}, {
		update : {
			method : 'PUT'
		},
		'query': { method: 'GET', isArray: true }
	});
}]);