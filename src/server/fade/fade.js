const config = require('./config')

module.exports = function() {
  if (config.development) {
    require('babel-core/register')()
  }

  config
}

// require('./fade/fade')()
