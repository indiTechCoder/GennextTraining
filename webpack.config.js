var webpack = require('webpack');
var path = require('path');

var config = {
  context: __dirname + '/app',
  entry: [
    'webpack-hot-middleware/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app.js'
  ],
  output: {
    path: __dirname + '/app',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015'
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=react', 'react-hot']
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
module.exports = config;
