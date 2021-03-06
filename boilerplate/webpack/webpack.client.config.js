const webpack = require('webpack')
const path = require('path')
const development = process.env.NODE_ENV !== 'production'

// settings

module.exports = {
  entry: development ? [
    'webpack-hot-middleware/client',
    path.resolve('src', 'client', 'index.js'),
  ] : path.resolve('src', 'client', 'index.js'),
  output: {
    path: path.resolve('build', 'client'),
    filename: 'bundle.client.js',
    publicPath: '/'
  },
  devtool: development ? 'inline-source-map' : null,
  plugins: development ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'react-hmre'],
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
