var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model("User");

module.exports = function () {

    passport.use(new LocalStrategy(User.authenticate()));
};
