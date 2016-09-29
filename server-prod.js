var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('./config/mongoose.js'),
    express = require('./config/express.js'),
    passport = require('./config/passport.js'),
    config = require('./config/config.js');
var db = mongoose(),
    app = express(),
    passport = passport();

app.listen(3000);