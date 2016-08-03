/**
 * Logger Test
 */

"use strict";

/* Node modules */

var _bunyan = require("bunyan");

var _bunyan2 = _interopRequireDefault(_bunyan);

var _configure = require("../../helpers/configure");

var _logger = require("../../../src/lib/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Third-party modules */

/* Files */


describe("Logger", function () {

    describe("Methods", function () {

        describe("#constructor", function () {

            it("should start a bunyan logger", function () {
                _configure.sinon.stub(_bunyan2.default, "createLogger").returns("logger");
                var obj = new _logger.Logger();
                (0, _configure.expect)(obj._log).to.be.equal("logger");
                _bunyan2.default.createLogger.restore();
            });
        });
    });

    describe("#info", function () {

        it("should create a info log", function () {
            var bunyanLogger = {
                info: _configure.sinon.stub()
            };
            _configure.sinon.stub(_bunyan2.default, "createLogger").returns(bunyanLogger);
            var obj = new _logger.Logger();
            obj.info("testing");
            (0, _configure.expect)(bunyanLogger.info).to.be.calledOnce.calledWith("testing");
            _bunyan2.default.createLogger.restore();
        });
    });

    describe("#warn", function () {

        it("should create a warn log", function () {
            var bunyanLogger = {
                warn: _configure.sinon.stub()
            };
            _configure.sinon.stub(_bunyan2.default, "createLogger").returns(bunyanLogger);
            var obj = new _logger.Logger();
            obj.warn("testing");
            (0, _configure.expect)(bunyanLogger.warn).to.be.calledOnce.calledWith("testing");
            _bunyan2.default.createLogger.restore();
        });
    });

    describe("#error", function () {

        it("should create a error log", function () {
            var bunyanLogger = {
                error: _configure.sinon.stub()
            };
            _configure.sinon.stub(_bunyan2.default, "createLogger").returns(bunyanLogger);
            var obj = new _logger.Logger();
            obj.error("testing");
            (0, _configure.expect)(bunyanLogger.error).to.be.calledOnce.calledWith("testing");
            _bunyan2.default.createLogger.restore();
        });
    });

    describe("#fatal", function () {

        it("should create a fatal log", function () {
            var bunyanLogger = {
                fatal: _configure.sinon.stub()
            };
            _configure.sinon.stub(_bunyan2.default, "createLogger").returns(bunyanLogger);
            var obj = new _logger.Logger();
            obj.fatal("testing");
            (0, _configure.expect)(bunyanLogger.fatal).to.be.calledOnce.calledWith("testing");
            _bunyan2.default.createLogger.restore();
        });
    });
});
//# sourceMappingURL=logger.js.map