/**
 * postgres
 */
"use strict";

/* Node modules */

/* Third-party modules */

/* Files */

var _configure = require("../../helpers/configure");

var _customer = require("../../../src/stores/customer");

var _logger = require("../../../src/lib/logger");

var CustomerModel = require("../../../src/resources/customerModel");


describe("Customer Store test", function () {

    describe("Methods", function () {

        describe("#constructor", function () {

            it("should set the model to the class", function () {

                var logger = {};
                var customerStore = new _customer.CustomerStore(CustomerModel, logger);
                (0, _configure.expect)(customerStore._customerModel).to.be.equal(CustomerModel);
                (0, _configure.expect)(customerStore._logger).to.be.equal(logger);
            });
        });

        describe("#get", function () {

            it("should get customer when correct filter is provided", function () {

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);

                var customer = {
                    "customer": "customer"
                };

                var lt = _configure.sinon.stub().resolves(customer);

                var gt = _configure.sinon.stub().returns({ lt: lt });

                var where = _configure.sinon.stub().returns({ gt: gt });

                var customerModel = {
                    find: _configure.sinon.stub().returns({ where: where })
                };

                var filters = {
                    "from": "2016-04-21",
                    "to": "2016-04-22"
                };

                var customerStore = new _customer.CustomerStore(customerModel, logger);
                return customerStore.get(filters).then(function (cust) {
                    (0, _configure.expect)(cust).to.be.equal(customer);
                    (0, _configure.expect)(logger.info).to.be.callCount(1);
                });
            });
        });

        describe("#getById", function () {

            it("should return customer when customerId is provided", function () {

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);

                var customer = {
                    "customer": "customer"
                };

                var customerModel = {
                    findOne: _configure.sinon.stub().resolves(customer)
                };

                var customerStore = new _customer.CustomerStore(customerModel, logger);
                return customerStore.getById("123456789").then(function (cust) {
                    (0, _configure.expect)(cust).to.be.equal(customer);
                    (0, _configure.expect)(logger.info).to.be.callCount(1);
                    (0, _configure.expect)(customerModel.findOne).to.be.callCount(1).calledWithExactly({ customerId: "123456789" });
                });
            });
        });

        describe("#getByMerlinAccountNo", function () {

            it("should return customer when customerId is provided", function () {

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);

                var customer = {
                    "customer": "customer"
                };

                var customerModel = {
                    findOne: _configure.sinon.stub().resolves(customer)
                };

                var customerStore = new _customer.CustomerStore(customerModel, logger);
                return customerStore.getByMerlinAccountNo("123456789").then(function (cust) {
                    (0, _configure.expect)(cust).to.be.equal(customer);
                    (0, _configure.expect)(logger.info).to.be.callCount(1);
                    (0, _configure.expect)(customerModel.findOne).to.be.callCount(1).calledWithExactly({ merlinAccountNo: "123456789" });
                });
            });
        });
    });
});
//# sourceMappingURL=customer.js.map