var mails = require('../../app/controllers/mail.server.controller');
var users = require('../../app/controllers/user.server.controller');

module.exports = function(app) {
    //creating DishItem
    //var mailRoute = express.Router();

    app.route('/api/mail')
        .get(users.requiresLogin, mails.inbox)
        .post(users.requiresLogin, mails.compose);

    app.route('/api/mail/sent')
        .get(users.requiresLogin, mails.sent);

    app.route('/api/mail/:mailId')
        .get(users.requiresLogin, mails.read);

    app.param('mailId', mails.ById);

}