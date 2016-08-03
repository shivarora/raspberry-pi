/**
 * customerRequest
 */

"use strict";

/* Third-party modules */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CustomerStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomerStore = exports.CustomerStore = function () {
    function CustomerStore(customerModel, logger) {
        _classCallCheck(this, CustomerStore);

        this._customerModel = customerModel;
        this._logger = logger;
    }

    _createClass(CustomerStore, [{
        key: "getById",
        value: function getById(customerId) {
            this._logger.info("Searching customers by customerId " + customerId);
            return this._customerModel.findOne({ customerId: customerId });
        }
    }, {
        key: "getByMerlinAccountNo",
        value: function getByMerlinAccountNo(merlinAccountNo) {
            this._logger.info("Searching customers by merlinAccountnNo " + merlinAccountNo);
            return this._customerModel.findOne({ merlinAccountNo: merlinAccountNo });
        }
    }, {
        key: "get",
        value: function get(filters) {
            this._logger.info("Searching customers using filers " + JSON.stringify(filters));
            return this._customerModel.find().where("createdAt").gt(filters.from + "T00:00:01.572Z").lt(filters.to + "T23:59:59.572Z");
        }
    }]);

    return CustomerStore;
}();
//# sourceMappingURL=customer.js.map