const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: path.resolve('src', 'server', 'server.js'),
  output: {
    path: path.resolve('build', 'server'),
    filename: 'bundle.server.js'
  },
  target: 'node',

  externals: fs.readdirSync(path.resolve('node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
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
