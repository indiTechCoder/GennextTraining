var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MailSchema = new Schema({
    from : {
        type : Schema.ObjectId,
        ref : 'User'
    },
    to : {
        type : Schema.ObjectId,
        ref : 'User'
    },
    subject : String,
    message : String,
    isRead : {type : Boolean, default : false},
    createdOn : { type : Date, default : Date.now }
});
mongoose.model('Mail', MailSchema);
