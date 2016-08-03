/**
 * postgres
 */
"use strict";

/* Node modules */

/* Third-party modules */

/* Files */

var _configure = require("../../helpers/configure");

var _order = require("../../../src/services/order");

var _order2 = require("../../../src/stores/order");

var _logger = require("../../../src/lib/logger");

describe("Order Service test", function () {

    describe("Methods", function () {

        describe("#constructor", function () {

            it("should set the store to the class", function () {

                var orderStore = {};
                var logger = {};

                var orderService = new _order.OrderService(orderStore, logger);
                (0, _configure.expect)(orderService._orderStore).to.be.equal(orderStore);
                (0, _configure.expect)(orderService._logger).to.be.equal(logger);
            });
        });
    });

    describe("#get", function () {

        it("should return orders when valid date range is provided", function () {

            var orderStore = new _order2.OrderStore();
            var order = {
                data: "order details"
            };
            _configure.sinon.stub(orderStore, "get").resolves(order);

            var logger = new _logger.Logger();
            _configure.sinon.stub(logger, "info").returns(true);
            _configure.sinon.stub(logger, "error").returns(true);

            var req = {
                from: "2016-04-14",
                to: "2016-04-22"
            };

            var orderService = new _order.OrderService(orderStore, logger);
            return orderService.get(req).then(function (order) {
                (0, _configure.expect)(order).to.be.equal(order);
                (0, _configure.expect)(logger.info).to.be.callCount(3);
                (0, _configure.expect)(logger.error).to.be.callCount(0);
            });
        });

        it("should return orders when no date range is provided", function () {

            var orderStore = new _order2.OrderStore();
            var order = {
                data: "order details"
            };
            _configure.sinon.stub(orderStore, "get").resolves(order);

            var logger = new _logger.Logger();
            _configure.sinon.stub(logger, "info").returns(true);
            _configure.sinon.stub(logger, "error").returns(true);

            var req = {};

            var orderService = new _order.OrderService(orderStore, logger);
            return orderService.get(req).then(function (order) {
                (0, _configure.expect)(order).to.be.equal(order);
                (0, _configure.expect)(logger.info).to.be.callCount(3);
                (0, _configure.expect)(logger.error).to.be.callCount(0);
            });
        });

        it("should return error when from date is greater than to date", function () {

            var orderStore = new _order2.OrderStore();
            var order = {
                data: "order details"
            };
            _configure.sinon.stub(orderStore, "get").resolves(order);

            var logger = new _logger.Logger();
            _configure.sinon.stub(logger, "info").returns(true);
            _configure.sinon.stub(logger, "error").returns(true);

            var req = {
                to: "2016-04-14",
                from: "2016-04-22"
            };

            var orderService = new _order.OrderService(orderStore, logger);
            return orderService.get(req).then(function () {
                throw new Error("Test failed");
            }).catch(function (err) {

                (0, _configure.expect)(err.message).to.be.equal("From date cannot be greater than to date.");
                (0, _configure.expect)(err).to.be.instanceOf(Error);
                (0, _configure.expect)(logger.info).to.be.callCount(1);
                (0, _configure.expect)(logger.error).to.be.callCount(1);
            });
        });

        it("should return error when invalid date is provided", function () {

            var orderStore = new _order2.OrderStore();
            var order = {
                data: "order details"
            };
            _configure.sinon.stub(orderStore, "get").resolves(order);

            var logger = new _logger.Logger();
            _configure.sinon.stub(logger, "info").returns(true);
            _configure.sinon.stub(logger, "error").returns(true);

            var req = {
                to: "invalid date",
                from: "invalid date"
            };

            var orderService = new _order.OrderService(orderStore, logger);
            return orderService.get(req).then(function () {
                throw new Error("Test failed");
            }).catch(function (err) {

                (0, _configure.expect)(err.message).to.be.equal("Invalid from or to date please make sure the date format is YYYY-MM-DD");
                (0, _configure.expect)(err).to.be.instanceOf(Error);
                (0, _configure.expect)(logger.info).to.be.callCount(1);
                (0, _configure.expect)(logger.error).to.be.callCount(1);
            });
        });

        it("should return error when from date is valid but to date is invalid", function () {

            var orderStore = new _order2.OrderStore();
            var order = {
                data: "order details"
            };
            _configure.sinon.stub(orderStore, "get").resolves(order);

            var logger = new _logger.Logger();
            _configure.sinon.stub(logger, "info").returns(true);
            _configure.sinon.stub(logger, "error").returns(true);

            var req = {
                to: "invalid date",
                from: "invalid date"
            };

            var orderService = new _order.OrderService(orderStore, logger);
            return orderService.get(req).then(function () {
                throw new Error("Test failed");
            }).catch(function (err) {

                (0, _configure.expect)(err.message).to.be.equal("Invalid from or to date please make sure the date format is YYYY-MM-DD");
                (0, _configure.expect)(err).to.be.instanceOf(Error);
                (0, _configure.expect)(logger.info).to.be.callCount(1);
                (0, _configure.expect)(logger.error).to.be.callCount(1);
            });
        });

        it("should return order when no payment method is provided", function () {

            var orderStore = new _order2.OrderStore();
            var order = {
                data: "order details"
            };
            _configure.sinon.stub(orderStore, "get").resolves(order);

            var logger = new _logger.Logger();
            _configure.sinon.stub(logger, "info").returns(true);
            _configure.sinon.stub(logger, "error").returns(true);

            var req = {
                from: "2016-04-22",
                to: "invalid date"
            };

            var orderService = new _order.OrderService(orderStore, logger);
            return orderService.get(req).then(function () {
                throw new Error("Test failed");
            }).catch(function (err) {
                (0, _configure.expect)(err).to.be.instanceOf(Error);
                (0, _configure.expect)(logger.info).to.be.callCount(1);
                (0, _configure.expect)(logger.error).to.be.callCount(1);
            });
        });

        it("should return order when payment type is dispatched", function () {

            var orderStore = new _order2.OrderStore();
            var order = {
                data: "order details"
            };
            _configure.sinon.stub(orderStore, "get").resolves(order);

            var logger = new _logger.Logger();
            _configure.sinon.stub(logger, "info").returns(true);
            _configure.sinon.stub(logger, "error").returns(true);

            var req = {
                from: "2016-04-14",
                to: "2016-04-22",
                payment: ["dispatched"]
            };

            var orderService = new _order.OrderService(orderStore, logger);
            return orderService.get(req).then(function (order) {
                (0, _configure.expect)(order).to.be.equal(order);
                (0, _configure.expect)(logger.info).to.be.callCount(3);
                (0, _configure.expect)(logger.error).to.be.callCount(0);
            });
        });

        it("should return order when payment type is paid", function () {

            var orderStore = new _order2.OrderStore();
            var order = {
                data: "order details"
            };
            _configure.sinon.stub(orderStore, "get").resolves(order);

            var logger = new _logger.Logger();
            _configure.sinon.stub(logger, "info").returns(true);
            _configure.sinon.stub(logger, "error").returns(true);

            var req = {
                from: "2016-04-14",
                to: "2016-04-22",
                payment: ["paid"]
            };

            var orderService = new _order.OrderService(orderStore, logger);
            return orderService.get(req).then(function (order) {
                (0, _configure.expect)(order).to.be.equal(order);
                (0, _configure.expect)(logger.info).to.be.callCount(3);
                (0, _configure.expect)(logger.error).to.be.callCount(0);
            });
        });

        it("should return error when payment type is invalid", function () {

            var orderStore = new _order2.OrderStore();
            var order = {
                data: "order details"
            };
            _configure.sinon.stub(orderStore, "get").resolves(order);

            var logger = new _logger.Logger();
            _configure.sinon.stub(logger, "info").returns(true);
            _configure.sinon.stub(logger, "error").returns(true);

            var req = {
                from: "2016-04-14",
                to: "2016-04-22",
                payment: ["not valid payment status"]
            };

            var orderService = new _order.OrderService(orderStore, logger);
            return orderService.get(req).then(function () {
                throw new Error("Test Failed");
            }).catch(function (err) {
                (0, _configure.expect)(err).to.be.instanceOf(Error);
                (0, _configure.expect)(logger.info).to.be.callCount(2);
                (0, _configure.expect)(logger.error).to.be.callCount(2);
            });
        });

        it("should ignore order all payment methods if payment type is set to paid", function () {

            var orderStore = new _order2.OrderStore();
            var order = {
                data: "order details"
            };
            _configure.sinon.stub(orderStore, "get").resolves(order);

            var logger = new _logger.Logger();
            _configure.sinon.stub(logger, "info").returns(true);
            _configure.sinon.stub(logger, "error").returns(true);

            var req = {
                from: "2016-04-14",
                to: "2016-04-22",
                payment: ["paid", "partial_dispatched", "dispatched", "payment_authorised", "pending"]
            };

            var orderService = new _order.OrderService(orderStore, logger);
            return orderService.get(req).then(function (order) {
                (0, _configure.expect)(order).to.be.equal(order);
                (0, _configure.expect)(logger.info).to.be.callCount(3);
                (0, _configure.expect)(logger.error).to.be.callCount(0);
            });
        });
    });

    describe("#getById", function () {

        it("should return orders details when searched by order reference", function () {

            var orderStore = new _order2.OrderStore();
            var order = {
                data: "order details"
            };
            _configure.sinon.stub(orderStore, "getById").resolves(order);

            var logger = new _logger.Logger();
            _configure.sinon.stub(logger, "info").returns(true);
            _configure.sinon.stub(logger, "error").returns(true);

            var req = {
                from: "2016-04-14",
                to: "2016-04-22"
            };

            var orderService = new _order.OrderService(orderStore, logger);
            return orderService.getById(req).then(function (order) {
                (0, _configure.expect)(order).to.be.equal(order);
                (0, _configure.expect)(logger.info).to.be.callCount(0);
                (0, _configure.expect)(logger.error).to.be.callCount(0);
            });
        });
    });
});
//# sourceMappingURL=order.js.map