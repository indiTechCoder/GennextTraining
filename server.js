var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var favicon = require('serve-favicon');

var app = express();

var config = require('./webpack.config.js');
var compiler = webpack(config);

app.use(express.static(path.join(__dirname, 'public')));
app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr', heartbeat: 10 * 1000
}));
app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, 'app/views/index.html'));
});

app.listen(3000);
