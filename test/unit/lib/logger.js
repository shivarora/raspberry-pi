/**
 * Logger Test
 */

"use strict";


/* Node modules */
import bunyan from "bunyan";

/* Third-party modules */


/* Files */
import {expect, proxyquire, sinon} from "../../helpers/configure";
import {Logger} from "../../../src/lib/logger";


describe("Logger", function () {

    describe("Methods", function () {

        describe("#constructor", function () {

            it("should start a bunyan logger", function () {
                sinon.stub(bunyan, "createLogger").returns("logger");
                let obj = new Logger();
                expect(obj._log).to.be.equal("logger");
                bunyan.createLogger.restore();
            });
        });
    });

    describe("#info", function () {

        it("should create a info log", function () {
            let bunyanLogger = {
                info : sinon.stub()
            };
            sinon.stub(bunyan, "createLogger").returns(bunyanLogger);
            let obj = new Logger();
            obj.info("testing");
            expect(bunyanLogger.info).to.be.calledOnce
                .calledWith("testing");
            bunyan.createLogger.restore();
        });
    });

    describe("#warn", function () {

        it("should create a warn log", function () {
            let bunyanLogger = {
                warn : sinon.stub()
            };
            sinon.stub(bunyan, "createLogger").returns(bunyanLogger);
            let obj = new Logger();
            obj.warn("testing");
            expect(bunyanLogger.warn).to.be.calledOnce
                .calledWith("testing");
            bunyan.createLogger.restore();
        });
    });

    describe("#error", function () {

        it("should create a error log", function () {
            let bunyanLogger = {
                error : sinon.stub()
            };
            sinon.stub(bunyan, "createLogger").returns(bunyanLogger);
            let obj = new Logger();
            obj.error("testing");
            expect(bunyanLogger.error).to.be.calledOnce
                .calledWith("testing");
            bunyan.createLogger.restore();
        });
    });

    describe("#fatal", function () {

        it("should create a fatal log", function () {
            let bunyanLogger = {
                fatal : sinon.stub()
            };
            sinon.stub(bunyan, "createLogger").returns(bunyanLogger);
            let obj = new Logger();
            obj.fatal("testing");
            expect(bunyanLogger.fatal).to.be.calledOnce
                .calledWith("testing");
            bunyan.createLogger.restore();
        });
    });
});
