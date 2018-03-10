const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './wrapper.js',
  output: {
      libraryTarget: 'var',
      library: 'showWidget',
      path: path.resolve(__dirname, 'build'),
      filename: 'rating-component.js',
      // publicPath: "/build/"
      publicPath: "https://s3.amazonaws.com/kudos-webplugin/"
  },
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/font-woff'
              }
            }
          ]
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            { loader: 'file-loader' }
          ]
        },
        {
          test: /\.scss$/,
          use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: "file-loader?name=[name].[ext]"
        }
      ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};