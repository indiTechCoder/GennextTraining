var mongoose = require('mongoose'),
    Conversation = mongoose.model('Conversation'),
    Message = mongoose.model('Message');


var inboxController = function() {};

inboxController.prototype.list = function(req, res, next) {

}

module.exports = new inboxController();