"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrderService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderService = exports.OrderService = function () {
    function OrderService(orderStore, logger) {
        _classCallCheck(this, OrderService);

        this._orderStore = orderStore;
        this._logger = logger;
    }

    _createClass(OrderService, [{
        key: "getById",
        value: function getById(orderReference) {
            return this._orderStore.getById(orderReference);
        }
    }, {
        key: "get",
        value: function get(filters) {
            var _this = this;

            return this._validateFilters(filters).then(function (filters) {
                _this._logger.info("Filters are valid getting data... " + JSON.stringify(filters));
                return _this._orderStore.get(filters);
            });
        }
    }, {
        key: "_validateFilters",
        value: function _validateFilters(filters) {
            var _this2 = this;

            return new Promise(function (resolve) {

                // Dates
                _this2._logger.info("validating dates from the filter " + JSON.stringify(filters));

                var from = filters.from ? new Date(filters.from) : new Date();
                var to = filters.to ? new Date(filters.to) : new Date();

                if (from > to) {

                    _this2._logger.error("from date was greater than to date! From Date -> " + from + " To Date -> " + to);
                    throw new Error("From date cannot be greater than to date.");
                }

                if (!(0, _moment2.default)(from).isValid() || !(0, _moment2.default)(to).isValid()) {

                    _this2._logger.error("Invalid from or to date please make sure the date format is YYYY-MM-DD");
                    throw new Error("Invalid from or to date please make sure the date format is YYYY-MM-DD");
                }

                // Payment Type
                var availablePaymentType = ["payment_required", "partial_dispatched", "dispatched", "payment_rejected", "payment_authorised", "pending", "paid"];

                var filteredPaymentType = [];

                _this2._logger.info("validating payment from the filter " + JSON.stringify(filters));

                var paymentType = filters.payment ? filters.payment : [];

                if (_lodash2.default.indexOf(paymentType, "paid") === -1) {

                    _lodash2.default.forEach(paymentType, function (payment) {

                        if (_lodash2.default.indexOf(availablePaymentType, payment) === -1) {

                            _this2._logger.error(payment + " is an invalid payment type");
                            _this2._logger.error("Payment type was " + paymentType);
                            throw new Error(payment + " is an invalid payment type! Please use " + JSON.stringify(availablePaymentType));
                        } else {
                            filteredPaymentType.push(payment);
                        }
                    });
                } else {

                    if (_lodash2.default.indexOf(filteredPaymentType, "partial_dispatched") === -1) {
                        filteredPaymentType.push("partial_dispatched");
                    }

                    if (_lodash2.default.indexOf(filteredPaymentType, "dispatched") === -1) {
                        filteredPaymentType.push("dispatched");
                    }

                    if (_lodash2.default.indexOf(filteredPaymentType, "payment_authorised") === -1) {
                        filteredPaymentType.push("payment_authorised");
                    }

                    if (_lodash2.default.indexOf(filteredPaymentType, "pending") === -1) {
                        filteredPaymentType.push("pending");
                    }
                }

                var cleanedFilters = {

                    "from": (0, _moment2.default)(from).format("YYYY-MM-DD"),
                    "to": (0, _moment2.default)(to).format("YYYY-MM-DD"),
                    "paymentType": filteredPaymentType
                };

                resolve(cleanedFilters);
            });
        }
    }]);

    return OrderService;
}();
//# sourceMappingURL=order.js.map