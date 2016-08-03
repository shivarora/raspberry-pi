/**
 * configure
 *
 * This getss required by Mocha and
 * configures various test harnesses
 */

"use strict";

/* Node modules */

/* Third-party modules */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sinon = exports.proxyquire = exports.expect = undefined;

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require("chai-as-promised");

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _proxyquire = require("proxyquire");

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require("sinon-chai");

var _sinonChai2 = _interopRequireDefault(_sinonChai);

require("sinon-as-promised");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Files */

_chai2.default.use(_sinonChai2.default);
_chai2.default.use(_chaiAsPromised2.default);

var expect = _chai2.default.expect;
var proxyquire = (0, _proxyquire.noCallThru)();

exports.expect = expect;
exports.proxyquire = proxyquire;
exports.sinon = _sinon2.default;
//# sourceMappingURL=configure.js.map