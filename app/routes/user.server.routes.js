var users = require('../../app/controllers/user.server.controller'),
    passport = require('passport');
var awsUploadObject = require('../../app/helper/awsUploadObject');
var awsDeleteObject = require('../../app/helper/awsDeleteObject');
module.exports = function (app){
    //google login
    app.get('/oauth/google', passport.authenticate('google', {
        failureRedirect : '/#!/login',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],

    }));
    //google callback
    app.get('/oauth/google/callback', passport.authenticate('google', {
        failureRedirect : '/#!/login',
        successRedirect : '/'
    }));
    
    //facebook login
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect : '/#!/login',
        scope: ['email', 'public_profile'] 
    

    }));
    //facebook callback
    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect : '/#!/login',
        successRedirect : '/'
    }));
    
    //local registeration
    app.route('/signup')
        .post(users.signup);
    
    //local login
    app.post('/signin',
        //check has verified
        users.isVarified,
        passport.authenticate('local'),
        function (req, res) {
        res.redirect('/');
    });
    //Email Confirmation
    app.route('/user/mail/confirmation/token/:userId')
        .get(users.confirmuser);
    //password change
    app.route('/user/changepassword')
        .post(users.requiresLogin,users.changePassword);

    //Password Reset Callback
    app.route('/user/resetpassword')
        .post(users.resetpassword);
    app.route('/user/sendpasswordresetmail')
        .post(users.sendpasswordresetmail);
    //signout
    app.get('/signout', users.signout);
    


    //profile
    app.route('/api/profile/:userId')
        .get(users.requiresLogin, users.read)
        .put(users.requiresLogin, users.isAuthorized, users.update);
    
    
    app.route('/api/uploadimage/user')
        .post(users.requiresLogin, awsUploadObject.doUpload, users.uploadImage);
    
    app.route('/api/deleteimage/user')
        .post(users.requiresLogin, awsDeleteObject.doDelete, users.deleteImage);
    
    app.route('/admin/users')
        .get(users.isAdmin, users.allUsers);

    app.param('userId', users.userById);
}