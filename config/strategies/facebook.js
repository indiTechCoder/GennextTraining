var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/user.server.controller');

module.exports = function () {
    passport.use(new FacebookStrategy({
        clientID : config.facebook.clientID,
        clientSecret : config.facebook.clientSecret,
        callbackURL : config.facebook.callbackURL,
        passReqToCallback : true,
        profileFields: ['id', 'emails', 'name','photos'] //This
    }, function (req, accessToken, refreshToken, profile, done) {
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
        console.log(profile);
        var providerUserProfile = {
            firstname : profile.name.givenName,
            lastname : profile.name.familyName,
            email : profile.emails[0].value,
            username : profile.emails[0].value,
            is_email_verified : true,
            facebook_profile_id : profile.id,
            profile_photo : profile.photos[0].value,
            role: 'guest',
            provider : "facebook"
        }
        users.saveOAuthUserProfile(req, providerUserProfile, done);
    }))
}
