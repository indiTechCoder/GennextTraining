var mongoose = require('mongoose'),
    Conversation = mongoose.model('Conversation'),
    Message = mongoose.model('Message');

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
var inboxController = function () { };

inboxController.prototype.list = function (req, res, next) {
   
}

module.exports = new inboxController();