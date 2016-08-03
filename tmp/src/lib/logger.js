"use strict";

/* Third-party modules */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bunyan = require("bunyan");

var Logger = exports.Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);

        this._log = bunyan.createLogger({
            name: "Cromwell Reporting API"
        });
    }

    _createClass(Logger, [{
        key: "info",
        value: function info(message) {
            this._log.info(message);
        }
    }, {
        key: "warn",
        value: function warn(message) {
            this._log.warn(message);
        }
    }, {
        key: "error",
        value: function error(message) {
            this._log.error(message);
        }
    }, {
        key: "fatal",
        value: function fatal(message) {
            console.log(message);
            this._log.fatal(message);
        }
    }]);

    return Logger;
}();
//# sourceMappingURL=logger.js.map