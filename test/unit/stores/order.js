/**
 * postgres
 */
"use strict";

/* Node modules */


/* Third-party modules */


/* Files */
import {expect, proxyquire, sinon} from "../../helpers/configure";

let OrderModel = require("../../../src/resources/orderModel");
import {OrderStore} from "../../../src/stores/order";
import {Logger} from "../../../src/lib/logger";


describe("Order Store test", function () {

    describe("Methods", function () {

        describe("#constructor", function () {

            it("should set the model to the class", function () {

                let logger = {};
                let orderStore = new OrderStore(OrderModel, logger);
                expect(orderStore._orderModel).to.be.equal(OrderModel);
                expect(orderStore._logger).to.be.equal(logger);

            });
        });

        describe("#get", function () {

            it("should return order when date is provided but no payment type is provided", function () {

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);

                let order = {
                    "order" : "order"
                };

                let lt = sinon.stub().resolves(order);

                let gt = sinon.stub().returns({lt});

                let where = sinon.stub().returns({gt});

                let orderModel = {
                    find : sinon.stub().returns({where})
                };

                let filters = {
                    "from":"2016-04-21",
                    "to":"2016-04-22",
                    "paymentType" : []
                };

                let orderStore = new OrderStore(orderModel,logger);
                return orderStore.get(filters)
                    .then(order => {
                        expect(order).to.be.equal(order);
                        expect(logger.info).to.be.callCount(2);
                    });
            });

            it("should return order when date and payment type is provided", function () {

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);

                let order = {
                    "order" : "order"
                };

                let where = sinon.stub().returns({in : sinon.stub().resolves(order)});

                let lt = sinon.stub().returns({where});

                let gt = sinon.stub().returns({lt});

                where = sinon.stub().returns({gt});

                let orderModel = {
                    find : sinon.stub().returns({where})
                };

                let filters = {
                    "from":"2016-04-21",
                    "to":"2016-04-22",
                    "paymentType" : ["paid"]
                };

                let orderStore = new OrderStore(orderModel,logger);
                return orderStore.get(filters)
                    .then(order => {
                        expect(order).to.be.equal(order);
                        expect(logger.info).to.be.callCount(2);
                    });
            });
        });

        describe("#getById", function () {

            it("should return order when order reference is provided", function () {

                let logger = new Logger();
                sinon.stub(logger, "info").returns(true);

                let order = {
                    "order": "order"
                };

                let orderModel = {
                    findOne: sinon.stub().resolves(order)
                };

                let orderStore = new OrderStore(orderModel, logger);
                return orderStore.getById("123456789")
                    .then(order => {
                        expect(order).to.be.equal(order);
                        expect(logger.info).to.be.callCount(1);
                        expect(orderModel.findOne).to.be.callCount(1)
                            .calledWithExactly({merlinOrderReference : "123456789"});
                    });
            });
        });

    });
});
