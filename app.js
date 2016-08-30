
﻿process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose.js'),
    express = require('./config/express.js'),
    passport = require('./config/passport.js'),
    config = require('./config/config.js');

var db = mongoose(),
    app = express(),
    passport = passport();

app.listen(process.env.PORT || config.port);
console.log("App Listning on port "+ config.port);
module.exports = app;
