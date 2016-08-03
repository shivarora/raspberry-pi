/**
 * index
 */

"use strict";

/* Node modules */

/* Third-party modules */

/* Files */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderRoutes = exports.OrderRoutes = function () {
    function OrderRoutes(orderService, logger) {
        _classCallCheck(this, OrderRoutes);

        this._orderService = orderService;
        this._logger = logger;
    }

    _createClass(OrderRoutes, [{
        key: "get",
        value: function get() {
            var _this = this;

            return [function (req, res) {

                return _this._orderService.get(req.query).then(function (result) {

                    res.send({ success: 1, message: "completed", data: result, retry: 0 });
                }).catch(function (err) {
                    res.send({ success: 0, message: " Error! " + err.message, data: {}, retry: 1 });
                });
            }];
        }
    }, {
        key: "getById",
        value: function getById() {
            var _this2 = this;

            return [function (req, res) {

                return _this2._orderService.getById(req.params.id).then(function (result) {

                    res.send({ success: 1, message: "completed", data: result, retry: 0 });
                }).catch(function (err) {
                    res.send({ success: 0, message: " Error! " + err.message, data: {}, retry: 1 });
                });
            }];
        }
    }]);

    return OrderRoutes;
}();
//# sourceMappingURL=orderRoutes.js.map