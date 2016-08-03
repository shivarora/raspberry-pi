/**
 * order store
 */

"use strict";

/* Node modules */

/* Third-party modules */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrderStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Files */

var OrderStore = exports.OrderStore = function () {
    function OrderStore(orderModel, logger) {
        _classCallCheck(this, OrderStore);

        this._orderModel = orderModel;
        this._logger = logger;
    }

    _createClass(OrderStore, [{
        key: "getById",
        value: function getById(orderReference) {
            this._logger.info("Searching order using order reference " + orderReference);
            return this._orderModel.findOne({ merlinOrderReference: orderReference });
        }
    }, {
        key: "get",
        value: function get(filters) {

            if (filters.paymentType.length === 0) {

                this._logger.info("Searching only using dates");
                this._logger.info("Searching using filers" + JSON.stringify(filters));
                return this._orderModel.find().where("creationDate").gt(filters.from + "T00:00:01.572Z").lt(filters.to + "T23:59:59.572Z");
            } else {

                this._logger.info("Searching using filter with date and payment");
                this._logger.info("Searching using filters" + JSON.stringify(filters));
                return this._orderModel.find().where("creationDate").gt(filters.from + "T00:00:01.572Z").lt(filters.to + "T23:59:59.572Z").where("orderStatus").in(filters.paymentType);
            }
        }
    }]);

    return OrderStore;
}();
//# sourceMappingURL=order.js.map