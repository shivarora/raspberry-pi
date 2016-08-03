/**
 * postgres
 */
"use strict";

/* Node modules */

/* Third-party modules */

/* Files */

var _configure = require("../../helpers/configure");

var _customer = require("../../../src/services/customer");

var _customer2 = require("../../../src/stores/customer");

var _logger = require("../../../src/lib/logger");

describe("Customer Service test", function () {

    describe("Methods", function () {

        describe("#constructor", function () {

            it("should set the store to the class", function () {

                var customerStore = {};
                var logger = {};

                var customerService = new _customer.CustomerService(customerStore, logger);
                (0, _configure.expect)(customerService._customerStore).to.be.equal(customerStore);
                (0, _configure.expect)(customerService._logger).to.be.equal(logger);
            });
        });

        describe("#get", function () {

            it("should return customers when valid date range is provided", function () {

                var customerStore = new _customer2.CustomerStore();
                var customer = {
                    data: "customer details"
                };
                _configure.sinon.stub(customerStore, "get").resolves(customer);

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);
                _configure.sinon.stub(logger, "error").returns(true);

                var req = {
                    from: "2016-04-14",
                    to: "2016-04-22"
                };

                var customerService = new _customer.CustomerService(customerStore, logger);
                return customerService.get(req).then(function (customer) {
                    (0, _configure.expect)(customer).to.be.equal(customer);
                    (0, _configure.expect)(logger.info).to.be.callCount(1);
                    (0, _configure.expect)(logger.error).to.be.callCount(0);
                });
            });

            it("should return customers when from date is greater than to date", function () {

                var customerStore = new _customer2.CustomerStore();
                var customer = {
                    data: "customer details"
                };
                _configure.sinon.stub(customerStore, "get").resolves(customer);

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);
                _configure.sinon.stub(logger, "error").returns(true);

                var req = {
                    to: "2016-04-14",
                    from: "2016-04-22"
                };

                var customerService = new _customer.CustomerService(customerStore, logger);
                return customerService.get(req).then(function () {
                    throw new Error("Test Failed");
                }).catch(function (err) {
                    (0, _configure.expect)(err).to.be.instanceOf(Error);
                    (0, _configure.expect)(logger.info).to.be.callCount(1);
                    (0, _configure.expect)(logger.error).to.be.callCount(1);
                });
            });

            it("should return error when invalid from date is provided", function () {

                var customerStore = new _customer2.CustomerStore();
                var customer = {
                    data: "customer details"
                };
                _configure.sinon.stub(customerStore, "get").resolves(customer);

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);
                _configure.sinon.stub(logger, "error").returns(true);

                var req = {
                    from: "invalid date",
                    to: "2016-04-22"
                };

                var customerService = new _customer.CustomerService(customerStore, logger);
                return customerService.get(req).then(function () {
                    throw new Error("Test Failed");
                }).catch(function (err) {
                    (0, _configure.expect)(err).to.be.instanceOf(Error);
                    (0, _configure.expect)(logger.info).to.be.callCount(1);
                    (0, _configure.expect)(logger.error).to.be.callCount(1);
                });
            });

            it("should return error when invalid to date is provided", function () {

                var customerStore = new _customer2.CustomerStore();
                var customer = {
                    data: "customer details"
                };
                _configure.sinon.stub(customerStore, "get").resolves(customer);

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);
                _configure.sinon.stub(logger, "error").returns(true);

                var req = {
                    from: "2016-04-22",
                    to: "invalid date"
                };

                var customerService = new _customer.CustomerService(customerStore, logger);
                return customerService.get(req).then(function () {
                    throw new Error("Test Failed");
                }).catch(function (err) {
                    (0, _configure.expect)(err).to.be.instanceOf(Error);
                    (0, _configure.expect)(logger.info).to.be.callCount(1);
                    (0, _configure.expect)(logger.error).to.be.callCount(1);
                });
            });

            it("should return customers when no date is provided", function () {

                var customerStore = new _customer2.CustomerStore();
                var customer = {
                    data: "customer details"
                };
                _configure.sinon.stub(customerStore, "get").resolves(customer);

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);
                _configure.sinon.stub(logger, "error").returns(true);

                var customerService = new _customer.CustomerService(customerStore, logger);
                return customerService.get({}).then(function (customer) {
                    (0, _configure.expect)(customer).to.be.equal(customer);
                    (0, _configure.expect)(logger.info).to.be.callCount(1);
                    (0, _configure.expect)(logger.error).to.be.callCount(0);
                });
            });
        });

        describe("#getById", function () {

            it("should return customer details when searched by customerId", function () {

                var customerStore = new _customer2.CustomerStore();
                var customer = {
                    data: "customer details"
                };
                _configure.sinon.stub(customerStore, "getById").resolves(customer);

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);
                _configure.sinon.stub(logger, "error").returns(true);

                var customerService = new _customer.CustomerService(customerStore, logger);
                return customerService.getById("123456").then(function (cust) {
                    (0, _configure.expect)(cust).to.be.equal(customer);
                    (0, _configure.expect)(customerStore.getById).to.be.callCount(1).calledWithExactly("123456");
                });
            });
        });

        describe("#getByMerlinAccountNo", function () {

            it("should return customer details when searched by merlinAccountNo", function () {

                var customerStore = new _customer2.CustomerStore();
                var customer = {
                    data: "customer details"
                };
                _configure.sinon.stub(customerStore, "getByMerlinAccountNo").resolves(customer);

                var logger = new _logger.Logger();
                _configure.sinon.stub(logger, "info").returns(true);
                _configure.sinon.stub(logger, "error").returns(true);

                var customerService = new _customer.CustomerService(customerStore, logger);
                return customerService.getByMerlinAccountNo("123456").then(function (cust) {
                    (0, _configure.expect)(cust).to.be.equal(customer);
                    (0, _configure.expect)(customerStore.getByMerlinAccountNo).to.be.callCount(1).calledWithExactly("123456");
                });
            });
        });
    });
});
//# sourceMappingURL=customer.js.map