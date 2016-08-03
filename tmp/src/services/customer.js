"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CustomerService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CustomerService = exports.CustomerService = function () {
    function CustomerService(customerStore, logger) {
        _classCallCheck(this, CustomerService);

        this._customerStore = customerStore;
        this._logger = logger;
    }

    _createClass(CustomerService, [{
        key: "getById",
        value: function getById(customerId) {
            return this._customerStore.getById(customerId);
        }
    }, {
        key: "getByMerlinAccountNo",
        value: function getByMerlinAccountNo(merlinAccountNo) {
            return this._customerStore.getByMerlinAccountNo(merlinAccountNo);
        }
    }, {
        key: "get",
        value: function get(filters) {
            var _this = this;

            return this._validateFilters(filters).then(function (filters) {
                return _this._customerStore.get(filters);
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

                var cleanedFilters = {

                    "from": (0, _moment2.default)(from).format("YYYY-MM-DD"),
                    "to": (0, _moment2.default)(to).format("YYYY-MM-DD")
                };

                resolve(cleanedFilters);
            });
        }
    }]);

    return CustomerService;
}();
//# sourceMappingURL=customer.js.map