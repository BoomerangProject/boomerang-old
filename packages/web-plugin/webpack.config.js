module.exports = {
  entry: './wrapper.js',
  output: {
      libraryTarget: 'var',
      library: 'showRatingComponent',
      path:     __dirname + '/build/',
      filename: 'rating-component.js',
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
        }
      ],
  }
};
