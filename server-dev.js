process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var path = require('path');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var favicon = require('serve-favicon');
var mongoose = require('./config/mongoose.js'),
    express = require('./config/express.js'),
    passport = require('./config/passport.js'),
    config = require('./config/config.js');
var db = mongoose(),
    app = express(),
    passport = passport();

var webpackconfig = require('./webpack.config.js');
var compiler = webpack(webpackconfig);

app.use(webpackMiddleware(compiler, {
    publicPath: webpackconfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

app.listen(3000);