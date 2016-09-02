const webpack = require('webpack')
const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

// settings

module.exports = {
  entry: path.resolve('src', 'client', 'index.js'),
  output: {
    path: path.resolve('build', 'client'),
    filename: 'bundle.client.js',
    publicPath: '/'
  },
  plugins: debug ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ] : [],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: [
            'react-html-attrs',
            'add-module-exports',
            'transform-class-properties',
            'transform-decorators-legacy'
          ]
        }
      }
    ]
  }
}
