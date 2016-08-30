var User = require('mongoose').model('User'),
    passport = require('passport'),
    mailHandler = require('../handlers/mail.server.handler');
var uuid = require('node-uuid');
var config = require('../../config/config');
var fs = require('fs');
//HandlingError
var getErrorMessage = function (err){
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = "Username already Exisit";
                break;
            default :
                message = "Something went Wrong";
        }
        
    }
    else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.erroes[errName].message;
            }
        };
        
    }
}

//for Entering data got from google and facebook
exports.saveOAuthUserProfile = function (req, profile, done){
    User.findUserByEmailId(profile.email, function (err, usr) {
        if (err) {
            return done(err);
        } else {
            if (!usr) {
                var user = new User(profile);
                user.save(function (serr) {
                    if (serr) {
                        //getErrorMessage(serr);
                        return res.redirect('/#!/register');
                    }
                    mailHandler.sendRegisterMail(user.email,null);
                    return done(serr, user);
                })
            }
            else {
                if (!usr.profile_photo.file) {
                    ///update profile photo
                    usr.profile_photo.file = profile.profile_photo.file;
                    usr.save(function (err) {
                        if (err) {
                        }
                        return done(err, usr);
                    });
                }
                return done(err, usr);
                
            }
        }
    });
}

//Registering user from Local register
exports.signup = function (req, res, next){
    if (!req.user) {
        
        User.register(new User({
            username: req.body.email,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            city: req.body.city,
            is_email_verified : false,
            role: 'guest',
            provider : "local"
        }), req.body.password, function (err,user) { 
            if (err) {
               return res.send({ success: false, error: err.message + ", use username and password, if you have forgotten password, please request for reset password." });
            }
            mailHandler.sendRegisterMail(user.email, user.id);
            //have to confirm from mail then only can login
            return res.json(user);
            
        });

       
    } else {
        return res.redirect('/#!/');
    }
}

//Reading User Details to json
exports.read = function (req, res) {
    res.json(req.profile);
}

//getting a single user from route param
exports.userById = function (req, res, next, id){
    
    User
    .findOne({ _id : id })
    .populate('host.events')
    .populate('host.allakartes')
    .populate('host.allakartes.dish_items')
    .exec(function (err, user) {
        if (err) {
            return res.status(400).send({
                message : getErrorMessage(err)
            });
        }
        req.profile = user;
        next();
    })
}

//signout
exports.signout = function (req, res){
    req.logout();
    res.redirect('/');
}

//check for authentications
exports.requiresLogin = function (req, res, nxt){
    if (!req.user) {
       return res.redirect('/#!/login');
        //return res.status(401).send({
        //    message : "User Not Authorized"
        //})
    }
    nxt();
}

exports.isAuthorized = function (req, res, next){
    if (req.profile.id != req.user.id) {
        return res.status(403).send({
            message : "Not Authorized"
        })
    }
    next();
}

exports.isAdmin = function (req, res, next) {
    if (req.user.role != 'admin') {
        return res.status(403).send({
            message : "Not Authorized"
        })
    }
    next();
}

exports.allUsers = function (req, res){
    var Users = User.find({});
    //filter using address, joing date, 
    User.find().exec(function (err, users) {
        if (err) {
        return res.status(400).send(getErrorMessage(err))
        }
        else {
            return res.json(users)
        }
    });
}

exports.update = function (req, res, next){
    var profile = req.profile;
    profile.firstname = req.body.firstname;
    profile.lastname = req.body.lastname;
    profile.profile_photo = req.body.profile_photo;
    profile.description = req.body.description;
    profile.email_business = req.body.email_business;
    profile.personal_mobile = req.body.personal_mobile;
    profile.business_mobile = req.body.business_mobile;
    profile.fixed_number = req.body.fixed_number;
    profile.profile_photo = req.body.profile_photo;
    profile.city = req.body.city;
    profile.tags = req.body.tags;
    //host
    profile.profile.host.randomFact = req.body.profile.host.randomFact;
    profile.profile.host.website = req.body.profile.host.website;
    profile.profile.host.profession = req.body.profile.host.profession;
    profile.profile.host.languages = req.body.profile.host.languages;
    profile.profile.host.cookingBackground = req.body.profile.host.cookingBackground;
    profile.profile.host.coHosts = req.body.profile.host.coHosts;
    profile.profile.host.preferredCurrency = req.body.profile.host.preferredCurrency;
    profile.profile.host.paypalEmail = req.body.profile.host.paypalEmail;
    //comman
    profile.profile.common.referredBy = req.body.profile.common.referredBy;
    profile.profile.common.referredByContent = req.body.profile.common.referredByContent;
    profile.profile.common.hasAllergies = req.body.profile.common.hasAllergies;
    profile.profile.common.otherAllergies = req.body.profile.common.otherAllergies;
    profile.profile.common.allergies = req.body.profile.common.allergies;
    profile.profile.common.foodPersonality = req.body.profile.common.foodPersonality;
    profile.profile.common.birthdate.birthday = new Date(req.body.profile.common.birthdate.birthday);
    profile.profile.common.address = req.body.profile.common.address;
    profile.profile.common.description = req.body.profile.common.description;
    profile.profile.common.phone = req.body.profile.common.phone;
    profile.profile.common.sex = req.body.profile.common.sex;

    profile.last_updated = new Date();
    profile.save(function (err) {
        if (err) {
            res.status(400).send({ message : getErrorMessage(err) });
        }
        return res.json(profile);
    })

}

exports.isVarified = function (req, res, next){
    User.findOne({ "username" : req.body.username }, function (err, user) {
        if (err) {
            return res.status(400).send({
                message : getErrorMessage(err)
            })
        }
        if (user && user.is_email_verified) {
            next();
        }
        else {
            return res.status(401).send(
                "Email Not Varified, We sent you mail with confirmation link"
            )
        }
    });
}

exports.sendpasswordresetmail = function (req, res, next){
    User.findOne({ username : req.body.email }, function (err, user) {
        if (err) {
            return res.status(400).send(getErrorMessage(err));
        }
        if (!user) {
            return res.status(400).send("No User with this Email");
        }
        else {
            var now = new Date();
            var expires = new Date(now.getTime() + (24 * 60 * 1000)).getTime();
            //create token and save in userschema
            user.reset_token = {
                token : uuid.v4(),
                expires : expires // in hour
            }
            user.save(function (err, usr) {
                if (err) {
                    return res.status(400).send('Error in generating Token');
                }
                var message = mailHandler.sendPasswordResetMail(usr.username, usr.reset_token.token);
                if(message === 'success'){
                	return res.send("Password Reset link has been sent to " + usr.username);
                }else{
                	return res.send("Unable to send password reset Mail " + usr.username);
                }
                
            });
        }
    });
}

exports.resetpassword = function (req, res, next){
    User.findOne({ email : req.body.email, "reset_token.token" : req.body.token }, function (err,usr) {
       
        if (err) {
            return res.status(400).send(getErrorMessage(err))
        }
        if (!usr) {
            return res.send("User/token is not valid");
        }
        var now = new Date();
        var ctim = now.getTime();
        //check for expires
        if (usr.reset_token.expires > now.getTime()) {
            usr.setPassword(req.body.password, function () {
                usr.reset_token.expires = 0;
                usr.save(function (err, user) {
                    if (err) {
                        return res.status(400).send(getErrorMessage(err))
                    }
                    return res.send("Password Reset Succesfully");
                });
                
            });
        }
        else {
            return res.status(401).send("Reset token has exipred");
        }

    });
}

exports.changePassword = function (req, res, next) {
    User.findOne({ email : req.user.username }, function (err, usr) {
        
        if (err) {
            return res.status(400).send(getErrorMessage(err))
        }
        //check for currentpassword
        usr.authenticate(req.body.oldpassword, function (err,user, passwordErr) {
            if (err) {
                return res.status(400).send(getErrorMessage(err));
            }
            if (passwordErr) {
                return res.status(400).send(getErrorMessage(passwordErr));
            }
            usr.setPassword(req.body.newpassword, function () {
                usr.save(function (err, user) {
                    if (err) {
                        return res.status(400).send(getErrorMessage(err))
                    }
                    return res.send("Password changed Succesfully");
                });
                
            });
        
        });
       

    });
}

//update DishItem For Image Upload
exports.uploadImage = function (req, res, next) {
    User.findOne({ _id : req.user._id })
     .exec(function (err, user) {
        if (req.file) {
            req.fileData = {
                Location : config.url + "uploads/" + req.file.filename,
                key : req.file.filename
            }
        }
        if (req.fileData) {
            user.profile_photo.file = req.fileData.Location;
            user.profile_photo.fileKey = req.fileData.key;
            user.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message : getErrorMessage(err)
                    })
                }
                return res.json(user);
            });
        }
        else {
            return res.status(500).send("Error in Uploading Image");
        }
    });
 }
       
exports.deleteImage = function (req, res, next) {
    User.update({ _id : req.user._id }, { $set : { profile_photo : {} } }, function (err, user) {
        return res.json(user);
    });
}

exports.confirmuser = function (req, res){
    if (!req.user) {
        var user = req.profile;
        user.is_email_verified = true;
        user.save(function (err) {
            if (err) {
                return res.status(400).send({ message : getErrorMessage(err) });
            }
            return res.redirect("/#!/");
        })
    }
}
