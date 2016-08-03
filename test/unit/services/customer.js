/**
 * postgres
 */
"use strict";

/* Node modules */


/* Third-party modules */


/* Files */
import {expect, proxyquire, sinon} from "../../helpers/configure";

import {CustomerService} from "../../../src/services/customer";
import {CustomerStore} from "../../../src/stores/customer";
import {Logger} from "../../../src/lib/logger";


describe("Customer Service test", function () {

    describe("Methods", function () {

        describe("#constructor", function () {

            it("should set the store to the class", function () {

                let customerStore = {};
                let logger = {};

                let customerService = new CustomerService(customerStore, logger);
                expect(customerService._customerStore).to.be.equal(customerStore);
                expect(customerService._logger).to.be.equal(logger);

            });
        });

        describe("#get", function () {

            it("should return customers when valid date range is provided", function () {

                let customerStore = new CustomerStore();
                let customer = {
                    data: "customer details"
                };
                sinon.stub(customerStore, "get").resolves(customer);

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);
                sinon.stub(logger, "error").returns(true);

                let req = {
                    from: "2016-04-14",
                    to: "2016-04-22"
                };

                let customerService = new CustomerService(customerStore, logger);
                return customerService.get(req)
                    .then(customer => {
                        expect(customer).to.be.equal(customer);
                        expect(logger.info).to.be.callCount(1);
                        expect(logger.error).to.be.callCount(0);
                    });

            });

            it("should return customers when from date is greater than to date", function () {

                let customerStore = new CustomerStore();
                let customer = {
                    data: "customer details"
                };
                sinon.stub(customerStore, "get").resolves(customer);

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);
                sinon.stub(logger, "error").returns(true);

                let req = {
                    to: "2016-04-14",
                    from: "2016-04-22"
                };

                let customerService = new CustomerService(customerStore, logger);
                return customerService.get(req)
                    .then(() => {
                        throw new Error("Test Failed");
                    })
                    .catch(err => {
                        expect(err).to.be.instanceOf(Error);
                        expect(logger.info).to.be.callCount(1);
                        expect(logger.error).to.be.callCount(1);
                    });

            });

            it("should return error when invalid from date is provided", function () {

                let customerStore = new CustomerStore();
                let customer = {
                    data: "customer details"
                };
                sinon.stub(customerStore, "get").resolves(customer);

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);
                sinon.stub(logger, "error").returns(true);

                let req = {
                    from: "invalid date",
                    to: "2016-04-22"
                };

                let customerService = new CustomerService(customerStore, logger);
                return customerService.get(req)
                    .then(() => {
                        throw new Error("Test Failed");
                    })
                    .catch(err => {
                        expect(err).to.be.instanceOf(Error);
                        expect(logger.info).to.be.callCount(1);
                        expect(logger.error).to.be.callCount(1);
                    });

            });

            it("should return error when invalid to date is provided", function () {

                let customerStore = new CustomerStore();
                let customer = {
                    data: "customer details"
                };
                sinon.stub(customerStore, "get").resolves(customer);

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);
                sinon.stub(logger, "error").returns(true);

                let req = {
                    from: "2016-04-22",
                    to: "invalid date"
                };

                let customerService = new CustomerService(customerStore, logger);
                return customerService.get(req)
                    .then(() => {
                        throw new Error("Test Failed");
                    })
                    .catch(err => {
                        expect(err).to.be.instanceOf(Error);
                        expect(logger.info).to.be.callCount(1);
                        expect(logger.error).to.be.callCount(1);
                    });
            });

            it("should return customers when no date is provided", function () {

                let customerStore = new CustomerStore();
                let customer = {
                    data: "customer details"
                };
                sinon.stub(customerStore, "get").resolves(customer);

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);
                sinon.stub(logger, "error").returns(true);

                let customerService = new CustomerService(customerStore, logger);
                return customerService.get({})
                    .then(customer => {
                        expect(customer).to.be.equal(customer);
                        expect(logger.info).to.be.callCount(1);
                        expect(logger.error).to.be.callCount(0);
                    });
            });
        });

        describe("#getById", function () {

            it("should return customer details when searched by customerId", function () {

                let customerStore = new CustomerStore();
                let customer = {
                    data: "customer details"
                };
                sinon.stub(customerStore, "getById").resolves(customer);

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);
                sinon.stub(logger, "error").returns(true);

                let customerService = new CustomerService(customerStore, logger);
                return customerService.getById("123456")
                    .then(cust => {
                        expect(cust).to.be.equal(customer);
                        expect(customerStore.getById).to.be.callCount(1)
                            .calledWithExactly("123456");
                    });
            });
        });

        describe("#getByMerlinAccountNo", function () {

            it("should return customer details when searched by merlinAccountNo", function () {

                let customerStore = new CustomerStore();
                let customer = {
                    data: "customer details"
                };
                sinon.stub(customerStore, "getByMerlinAccountNo").resolves(customer);

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);
                sinon.stub(logger, "error").returns(true);

                let customerService = new CustomerService(customerStore, logger);
                return customerService.getByMerlinAccountNo("123456")
                    .then(cust => {
                        expect(cust).to.be.equal(customer);
                        expect(customerStore.getByMerlinAccountNo).to.be.callCount(1)
                            .calledWithExactly("123456");
                    });
            });
        });
    });
});
