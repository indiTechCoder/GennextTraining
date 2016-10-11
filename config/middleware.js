var ERROR = require('./error');

// use authentcation header validation
// validate the authentication header
exports.validateAuthHeader = function(){
	return function (req, res, next) {
		if(req.headers["x-auth-id"] !== 'AUTH_ID'){
			return ERROR({status:404},req,res);
		}
		return next();
	};
};

exports.MainPage = function(config){
	return function (req, res, next) {
		next();
	};
};
// check the UUID in the request header if present continue if not generate new and cont.
exports.checkUserUUID = function(config){
	return function (req, res, next) {
		next();
	};
};