/**
 * app
 */

"use strict";

var _config = require("./config.json");

var _config2 = _interopRequireDefault(_config);

var _restify = require("restify");

var _restify2 = _interopRequireDefault(_restify);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _logger = require("./lib/logger");

var _customer = require("./stores/customer");

var _customerRoutes = require("./routes/customerRoutes");

var _customer2 = require("./services/customer");

var _order = require("./stores/order");

var _orderRoutes = require("./routes/orderRoutes");

var _order2 = require("./services/order");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mongoose connection
var mongoose = require("mongoose");

/* Files */

mongoose.connect(_config2.default.db.mongodb.string);

// Logger
var logger = new _logger.Logger();

// Order
var CustomerModel = require("./resources/customerModel");
var customerStore = new _customer.CustomerStore(CustomerModel, logger);
var customerService = new _customer2.CustomerService(customerStore, logger);
var customerRoutes = new _customerRoutes.CustomerRoutes(customerService, logger);

// Customer
var OrderModel = require("./resources/orderModel");
var orderStore = new _order.OrderStore(OrderModel, logger);
var orderService = new _order2.OrderService(orderStore, logger);
var orderRoutes = new _orderRoutes.OrderRoutes(orderService, logger);

var server = void 0;
/* Create the server instance */
if (_config2.default.server.production) {
    server = _restify2.default.createServer({
        certificate: _fs2.default.readFileSync("/keys/live/ssl_certificate.crt"),
        key: _fs2.default.readFileSync("/keys/live/api2016srv.key"),
        name: "Cromwell Reporting Api"
    });
} else {
    server = _restify2.default.createServer();
}

server.use(_restify2.default.queryParser()).use(_restify2.default.gzipResponse()).use(_restify2.default.bodyParser());

/* Check for Token */
server.pre(function (req, res, next) {
    if (req.headers.username === "cromwell-admin" && req.headers.password === "62079c94-ef3e-11e5-9ce9-5e5517507c66") {
        next();
    } else {
        res.send({ success: 0, message: "Invalid username or password", data: {}, retry: 1 });
    }
});

// Orders
server.get("/v1/orders", orderRoutes.get());
server.get("/v1/orders/:id", orderRoutes.getById());

// Customers
server.get("/v1/customers", customerRoutes.get());
server.get("/v1/customers/:id", customerRoutes.getById());
server.get("/v1/customers/merlin/:id", customerRoutes.getByMerlinAccountNo());

/* Start up the server */
server.listen(_config2.default.server.port, function () {
    logger.info("System Listen on port " + _config2.default.server.port);
});
//# sourceMappingURL=app.js.map