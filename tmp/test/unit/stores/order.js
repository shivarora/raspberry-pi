/**
 * postgres
 */
"use strict";

/* Node modules */

/* Third-party modules */

/* Files */

var _configure = require("../../helpers/configure");

var _order = require("../../../src/stores/order");

var _logger = require("../../../src/lib/logger");

var OrderModel = require("../../../src/resources/orderModel");


describe("Order Store test", function () {

    describe("Methods", function () {

        describe("#constructor", function () {

            it("should set the model to the class", function () {

                var logger = {};
                var orderStore = new _order.OrderStore(OrderModel, logger);
                (0, _configure.expect)(orderStore._orderModel).to.be.equal(OrderModel);
                (0, _configure.expect)(orderStore._logger).to.be.equal(logger);
            });
        });

        describe("#get", function () {

            it("should return order when date is provided but no payment type is provided", function () {

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);

                var order = {
                    "order": "order"
                };

                var lt = _configure.sinon.stub().resolves(order);

                var gt = _configure.sinon.stub().returns({ lt: lt });

                var where = _configure.sinon.stub().returns({ gt: gt });

                var orderModel = {
                    find: _configure.sinon.stub().returns({ where: where })
                };

                var filters = {
                    "from": "2016-04-21",
                    "to": "2016-04-22",
                    "paymentType": []
                };

                var orderStore = new _order.OrderStore(orderModel, logger);
                return orderStore.get(filters).then(function (order) {
                    (0, _configure.expect)(order).to.be.equal(order);
                    (0, _configure.expect)(logger.info).to.be.callCount(2);
                });
            });

            it("should return order when date and payment type is provided", function () {

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);

                var order = {
                    "order": "order"
                };

                var where = _configure.sinon.stub().returns({ in: _configure.sinon.stub().resolves(order) });

                var lt = _configure.sinon.stub().returns({ where: where });

                var gt = _configure.sinon.stub().returns({ lt: lt });

                where = _configure.sinon.stub().returns({ gt: gt });

                var orderModel = {
                    find: _configure.sinon.stub().returns({ where: where })
                };

                var filters = {
                    "from": "2016-04-21",
                    "to": "2016-04-22",
                    "paymentType": ["paid"]
                };

                var orderStore = new _order.OrderStore(orderModel, logger);
                return orderStore.get(filters).then(function (order) {
                    (0, _configure.expect)(order).to.be.equal(order);
                    (0, _configure.expect)(logger.info).to.be.callCount(2);
                });
            });
        });

        describe("#getById", function () {

            it("should return order when order reference is provided", function () {

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);

                var order = {
                    "order": "order"
                };

                var orderModel = {
                    findOne: _configure.sinon.stub().resolves(order)
                };

                var orderStore = new _order.OrderStore(orderModel, logger);
                return orderStore.getById("123456789").then(function (order) {
                    (0, _configure.expect)(order).to.be.equal(order);
                    (0, _configure.expect)(logger.info).to.be.callCount(1);
                    (0, _configure.expect)(orderModel.findOne).to.be.callCount(1).calledWithExactly({ merlinOrderReference: "123456789" });
                });
            });
        });
    });
});
//# sourceMappingURL=order.js.map