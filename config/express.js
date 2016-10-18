var config = require('./config.js'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    crypto = require('crypto'),
    ERROR = require('./error'),
    compression = require('compression'),
    log4js = require('log4js');



module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
        app.set('env', 'development');
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
        app.set('env', 'production');
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));
    app.use(compression());
    app.set('view cache', true);
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
    require('../app/routes/training.server.routes')(app);
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            var e = new Error(500);
            e.status = err.status || 500;
            return ERROR(e, req, res);
        });
    }

    // production error handler
    // no stacktraces leaked to user
    if (app.get('env') === 'production') {
        app.use(function(err, req, res, next) {
            var e = new Error(500);
            e.status = err.status || 500;
            return ERROR(e, req, res);
        });
    }

    app.use(express.static('./public'));
    return app;

}