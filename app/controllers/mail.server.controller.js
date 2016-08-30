var mongoose = require('mongoose'),
    Mails = mongoose.model('Mail')
    Users = mongoose.model('User');

var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errorName in err.errors) {
            if (err.errors[errorName].message) {
                return err.errors[errorName].message;
            }
        }
    } else {
        return 'Unknown Server Error';
    }
}
var mailController = function () { };

mailController.prototype.compose = function (req,res){
    //check for toemail id present or not
    Users.findOne({ email : req.body.to }).exec(function (err, tusr) {
        if (err) {
            return res.status(400).send({ success : false, message : getErrorMessage(err) });
        }
        if (!tusr) {
            return res.status(400).send({ success : false, message : "No user found with email" });
        }
        var mail = new Mails(req.body);
        mail.from = req.user._id;
        mail.to = tusr._id;
        mail.save(function (err, mail) {
            if (err) {
                return res.status(400).send({ success : false, message : getErrorMessage(err) });
            }
            return res.json(mail);
        });
    })
}

mailController.prototype.inbox = function (req, res){
    Mails.find({ to : req.user._id })
    .populate('to')
    .populate('from')
    .sort('-createdOn')
    .exec(function (err, mails) {
        if (err) {
            return res.status(400).send({ message : getErrorMessage(err), success : false });
        }
        return res.json(mails);
    });
}

mailController.prototype.sent = function (req, res) {
    Mails.find({ from : req.user._id })
    .populate('to')
    .populate('from')
    .sort('-createdOn')
    .exec(function (err, mails) {
        if (err) {
            return res.status(400).send({ message : getErrorMessage(err), success : false });
        }
        return res.json(mails);
    });
}

mailController.prototype.read = function (req, res){
    return res.json(req.mail);
}

mailController.prototype.ById = function (req, res, next, id){
    Mails.findById(id)
    .populate('to')
    .populate('from')
    .exec(function (err, mail) {
        if (err) {
            return res.status(400).send({ message : getErrorMessage(err), success : false });
        }
        //check for the user reading it to save is read
        if (mail.to._id === req.user._id && !mail.isRead) {
            //set is read true
            mail.isRead = true;
            mail.save(function (err, mail) {
                
            });
        }
        req.mail = mail;
        next();
    });
}


module.exports = new mailController();