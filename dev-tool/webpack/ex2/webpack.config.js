const webpack = require('webpack');
module.exports = {
  entry: {
    app: '',
  },
  output: {
    path: '/dist',
    filename: '[name].js',
    publicPath: '/',
  },
  module: {

  },
  plugins: [],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};