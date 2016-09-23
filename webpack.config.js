var webpack = require('webpack');
var path = require('path');

var config = {
    entry: [
        'webpack-hot-middleware/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './client/app/index'
    ],
    output: {
        path: __dirname + '/client',
        filename: 'bundle.js',
    },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'client')
    }]
  },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
module.exports = config;