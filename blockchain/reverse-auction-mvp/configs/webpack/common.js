// shared config (dev and prod)
const {
  resolve
} = require('path');
const webpack = require('webpack');
const {
  CheckerPlugin
} = require('awesome-typescript-loader');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';
console.log(process.env.BUILD_ENV, 'isDev', isDev, JSON.stringify(isDev ? 'development' : 'production'))
module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader', 'ts-loader'],
      exclude: /node_modules/,
    },
    {
      test: /\.tsx?$/,
      use: ['babel-loader', 'awesome-typescript-loader'],
    },
    {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      }, 'postcss-loader',],
    },
    {
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: 'css-loader',
        options: {
          // CSS Loader https://github.com/webpack/css-loader
          importLoaders: 1,
          // CSS Modules https://github.com/css-modules/css-modules
          modules: true,
          localIdentName: isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
          discardComments: {
            removeAll: true
          },
        },
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
        'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
      ],
    },
    ],
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin(({
      'process.env.BROWSER': true,
      'BUILD_ENV': JSON.stringify(isDev ? 'development' : 'production'),
      'EMAIL_SUB_API_ROOT': JSON.stringify(isDev ? `http://localhost:3000` : `https://api.march.eco`)
    })),
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  performance: {
    hints: false,
  },
};
