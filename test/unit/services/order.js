/**
 * postgres
 */
"use strict";

/* Node modules */


/* Third-party modules */


/* Files */
import {expect, proxyquire, sinon} from "../../helpers/configure";

import {OrderService} from "../../../src/services/order";
import {OrderStore} from "../../../src/stores/order";
import {Logger} from "../../../src/lib/logger";


describe("Order Service test", function () {

    describe("Methods", function () {

        describe("#constructor", function () {

            it("should set the store to the class", function () {

                let orderStore = {};
                let logger = {};

                let orderService = new OrderService(orderStore, logger);
                expect(orderService._orderStore).to.be.equal(orderStore);
                expect(orderService._logger).to.be.equal(logger);

            });
        });
    });

    describe("#get", function () {

        it("should return orders when valid date range is provided", function () {

            let orderStore = new OrderStore();
            let order = {
                data :"order details"
            };
            sinon.stub(orderStore, "get").resolves(order);

            let logger = new Logger();
            sinon.stub(logger, "info").returns(true);
            sinon.stub(logger, "error").returns(true);

            let req = {
                from : "2016-04-14",
                to : "2016-04-22"
            };

            let orderService = new OrderService(orderStore,logger);
            return orderService.get(req)
                .then(order => {
                    expect(order).to.be.equal(order);
                    expect(logger.info).to.be.callCount(3);
                    expect(logger.error).to.be.callCount(0);
                });
        });

        it("should return orders when no date range is provided", function () {

            let orderStore = new OrderStore();
            let order = {
                data :"order details"
            };
            sinon.stub(orderStore, "get").resolves(order);

            let logger = new Logger();
            sinon.stub(logger, "info").returns(true);
            sinon.stub(logger, "error").returns(true);

            let req = {};

            let orderService = new OrderService(orderStore,logger);
            return orderService.get(req)
                .then(order => {
                    expect(order).to.be.equal(order);
                    expect(logger.info).to.be.callCount(3);
                    expect(logger.error).to.be.callCount(0);
                });
        });

        it("should return error when from date is greater than to date", function () {

            let orderStore = new OrderStore();
            let order = {
                data :"order details"
            };
            sinon.stub(orderStore, "get").resolves(order);

            let logger = new Logger();
            sinon.stub(logger, "info").returns(true);
            sinon.stub(logger, "error").returns(true);

            let req = {
                to : "2016-04-14",
                from : "2016-04-22",
            };

            let orderService = new OrderService(orderStore,logger);
            return orderService.get(req)
                .then(() => {
                    throw new Error("Test failed");
                })
                .catch((err) => {

                    expect(err.message).to.be.equal(
                        "From date cannot be greater than to date."
                    );
                    expect(err).to.be.instanceOf(Error);
                    expect(logger.info).to.be.callCount(1);
                    expect(logger.error).to.be.callCount(1);

                });
        });

        it("should return error when invalid date is provided", function () {

            let orderStore = new OrderStore();
            let order = {
                data :"order details"
            };
            sinon.stub(orderStore, "get").resolves(order);

            let logger = new Logger();
            sinon.stub(logger, "info").returns(true);
            sinon.stub(logger, "error").returns(true);

            let req = {
                to : "invalid date",
                from : "invalid date",
            };

            let orderService = new OrderService(orderStore,logger);
            return orderService.get(req)
                .then(() => {
                    throw new Error("Test failed");
                })
                .catch((err) => {

                    expect(err.message).to.be.equal(
                        "Invalid from or to date please make sure the date format is YYYY-MM-DD"
                    );
                    expect(err).to.be.instanceOf(Error);
                    expect(logger.info).to.be.callCount(1);
                    expect(logger.error).to.be.callCount(1);

                });
        });

        it("should return error when from date is valid but to date is invalid", function () {

            let orderStore = new OrderStore();
            let order = {
                data :"order details"
            };
            sinon.stub(orderStore, "get").resolves(order);

            let logger = new Logger();
            sinon.stub(logger, "info").returns(true);
            sinon.stub(logger, "error").returns(true);

            let req = {
                to : "invalid date",
                from : "invalid date",
            };

            let orderService = new OrderService(orderStore,logger);
            return orderService.get(req)
                .then(() => {
                    throw new Error("Test failed");
                })
                .catch((err) => {

                    expect(err.message).to.be.equal(
                        "Invalid from or to date please make sure the date format is YYYY-MM-DD"
                    );
                    expect(err).to.be.instanceOf(Error);
                    expect(logger.info).to.be.callCount(1);
                    expect(logger.error).to.be.callCount(1);

                });
        });

        it("should return order when no payment method is provided", function () {

            let orderStore = new OrderStore();
            let order = {
                data :"order details"
            };
            sinon.stub(orderStore, "get").resolves(order);

            let logger = new Logger();
            sinon.stub(logger, "info").returns(true);
            sinon.stub(logger, "error").returns(true);

            let req = {
                from : "2016-04-22",
                to : "invalid date"
            };

            let orderService = new OrderService(orderStore,logger);
            return orderService.get(req)
                .then(() => {
                    throw new Error("Test failed");
                })
                .catch(err => {
                    expect(err).to.be.instanceOf(Error);
                    expect(logger.info).to.be.callCount(1);
                    expect(logger.error).to.be.callCount(1);
                });
        });

        it("should return order when payment type is dispatched", function () {

            let orderStore = new OrderStore();
            let order = {
                data :"order details"
            };
            sinon.stub(orderStore, "get").resolves(order);

            let logger = new Logger();
            sinon.stub(logger, "info").returns(true);
            sinon.stub(logger, "error").returns(true);

            let req = {
                from : "2016-04-14",
                to : "2016-04-22",
                payment : [
                    "dispatched"
                ]
            };

            let orderService = new OrderService(orderStore,logger);
            return orderService.get(req)
                .then(order => {
                    expect(order).to.be.equal(order);
                    expect(logger.info).to.be.callCount(3);
                    expect(logger.error).to.be.callCount(0);
                });
        });

        it("should return order when payment type is paid", function () {

            let orderStore = new OrderStore();
            let order = {
                data :"order details"
            };
            sinon.stub(orderStore, "get").resolves(order);

            let logger = new Logger();
            sinon.stub(logger, "info").returns(true);
            sinon.stub(logger, "error").returns(true);

            let req = {
                from : "2016-04-14",
                to : "2016-04-22",
                payment : [
                    "paid"
                ]
            };

            let orderService = new OrderService(orderStore,logger);
            return orderService.get(req)
                .then(order => {
                    expect(order).to.be.equal(order);
                    expect(logger.info).to.be.callCount(3);
                    expect(logger.error).to.be.callCount(0);
                });
        });

        it("should return error when payment type is invalid", function () {

            let orderStore = new OrderStore();
            let order = {
                data :"order details"
            };
            sinon.stub(orderStore, "get").resolves(order);

            let logger = new Logger();
            sinon.stub(logger, "info").returns(true);
            sinon.stub(logger, "error").returns(true);

            let req = {
                from : "2016-04-14",
                to : "2016-04-22",
                payment : [
                    "not valid payment status"
                ]
            };

            let orderService = new OrderService(orderStore,logger);
            return orderService.get(req)
                .then(() => {
                    throw new Error("Test Failed");
                })
                .catch(err => {
                    expect(err).to.be.instanceOf(Error);
                    expect(logger.info).to.be.callCount(2);
                    expect(logger.error).to.be.callCount(2);
                });
        });

        it("should ignore order all payment methods if payment type is set to paid", function () {

            let orderStore = new OrderStore();
            let order = {
                data :"order details"
            };
            sinon.stub(orderStore, "get").resolves(order);

            let logger = new Logger();
            sinon.stub(logger, "info").returns(true);
            sinon.stub(logger, "error").returns(true);

            let req = {
                from : "2016-04-14",
                to : "2016-04-22",
                payment : [
                    "paid",
                    "partial_dispatched",
                    "dispatched",
                    "payment_authorised",
                    "pending"
                ]
            };

            let orderService = new OrderService(orderStore,logger);
            return orderService.get(req)
                .then(order => {
                    expect(order).to.be.equal(order);
                    expect(logger.info).to.be.callCount(3);
                    expect(logger.error).to.be.callCount(0);
                });
        });
    });

    describe("#getById", function () {

        it("should return orders details when searched by order reference", function () {

            let orderStore = new OrderStore();
            let order = {
                data: "order details"
            };
            sinon.stub(orderStore, "getById").resolves(order);

            let logger = new Logger();
            sinon.stub(logger, "info").returns(true);
            sinon.stub(logger, "error").returns(true);

            let req = {
                from: "2016-04-14",
                to: "2016-04-22"
            };

            let orderService = new OrderService(orderStore, logger);
            return orderService.getById(req)
                .then(order => {
                    expect(order).to.be.equal(order);
                    expect(logger.info).to.be.callCount(0);
                    expect(logger.error).to.be.callCount(0);
                });
        });
    });

});
