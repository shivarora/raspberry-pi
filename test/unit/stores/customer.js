/**
 * postgres
 */
"use strict";

/* Node modules */


/* Third-party modules */


/* Files */
import {expect, proxyquire, sinon} from "../../helpers/configure";

let CustomerModel = require("../../../src/resources/customerModel");
import {CustomerStore} from "../../../src/stores/customer";
import {Logger} from "../../../src/lib/logger";


describe("Customer Store test", function () {

    describe("Methods", function () {

        describe("#constructor", function () {

            it("should set the model to the class", function () {

                let logger = {};
                let customerStore = new CustomerStore(CustomerModel, logger);
                expect(customerStore._customerModel).to.be.equal(CustomerModel);
                expect(customerStore._logger).to.be.equal(logger);

            });
        });

        describe("#get", function () {

            it("should get customer when correct filter is provided", function () {

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);

                let customer = {
                    "customer": "customer"
                };

                let lt = sinon.stub().resolves(customer);

                let gt = sinon.stub().returns({lt});

                let where = sinon.stub().returns({gt});

                let customerModel = {
                    find : sinon.stub().returns({where})
                };

                let filters = {
                    "from": "2016-04-21",
                    "to": "2016-04-22"
                };

                let customerStore = new CustomerStore(customerModel, logger);
                return customerStore.get(filters)
                    .then(cust => {
                        expect(cust).to.be.equal(customer);
                        expect(logger.info).to.be.callCount(1);
                    });
            });
        });

        describe("#getById", function () {

            it("should return customer when customerId is provided", function () {

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);

                let customer = {
                    "customer": "customer"
                };

                let customerModel = {
                    findOne: sinon.stub().resolves(customer)
                };

                let customerStore = new CustomerStore(customerModel, logger);
                return customerStore.getById("123456789")
                    .then(cust => {
                        expect(cust).to.be.equal(customer);
                        expect(logger.info).to.be.callCount(1);
                        expect(customerModel.findOne).to.be.callCount(1)
                            .calledWithExactly({customerId : "123456789"});
                    });
            });
        });

        describe("#getByMerlinAccountNo", function () {

            it("should return customer when customerId is provided", function () {

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);

                let customer = {
                    "customer": "customer"
                };

                let customerModel = {
                    findOne: sinon.stub().resolves(customer)
                };

                let customerStore = new CustomerStore(customerModel, logger);
                return customerStore.getByMerlinAccountNo("123456789")
                    .then(cust => {
                        expect(cust).to.be.equal(customer);
                        expect(logger.info).to.be.callCount(1);
                        expect(customerModel.findOne).to.be.callCount(1)
                            .calledWithExactly({merlinAccountNo : "123456789"});
                    });
            });
        });

    });
});
