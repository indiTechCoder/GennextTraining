var config = require('./config.js'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport')
crypto = require('crypto');

module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('views', 'client');
    app.set('view engine', 'ejs');

    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/user.server.routes')(app);
    require('../app/routes/index.server.routes')(app);
    require('../app/routes/training.server.routes')(app);

    app.use(express.static('./public'));
    return app;

}