/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _http = __webpack_require__(1);

	var _http2 = _interopRequireDefault(_http);

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();
	var server = _http2.default.createServer(app);

	// this shit should be abstracted...

	app.listen(_config2.default.port, function (err) {
	  if (err) {
	    console.log(err);
	  }
	  console.log('🌍 listening at http://%s:%s', _config2.default.host, _config2.default.port);
	});

	app.get('/', function (req, res) {
	  res.send('Hello world');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var environment = {
	  development: {
	    isProduction: false
	  },
	  production: {
	    isProduction: true
	  }
	}[process.env.NODE_ENV || 'development'];

	var isApi = false;

	exports.default = {
	  host: process.env.HOST || 'localhost',
	  port: process.env.PORT || 7000,
	  tapiHost: isApi ? process.env.APIHOST || 'localhost' : null,
	  apiPort: isApi ? process.env.APIPORT : null,
	  environment: environment
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);