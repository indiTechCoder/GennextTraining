var passport = require('passport'),
    url = require('url'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    config = require('../config'),
    users = require('../../app/controllers/user.server.controller');
var fs = require('fs');
module.exports = function (){
    
    try{
    passport.use(new GoogleStrategy({
        clientID : config.google.clientID,
        clientSecret : config.google.clientSecret,
        callbackURL : config.google.callbackURL,
        passReqToCallback : true
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
                google_profile_id : profile.id,
                profile_photo : {
                    file: profile.photos[0].value,
                    key : null
                },
                role: 'guest',
                provider : "google"
            }
        users.saveOAuthUserProfile(req, providerUserProfile, done);
    }))

    } catch (e) {
    fs.writeFile('./myFile.txt', e , function (err) {
                
    });
    };
}
