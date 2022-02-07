"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var cliente_route_1 = require("./cliente.route");
var parceiro_route_1 = require("./parceiro.route");
var plano_route_1 = require("./plano.route");
var Routes = /** @class */ (function () {
    function Routes() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    Routes.prototype.middleware = function () {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    };
    Routes.prototype.routes = function () {
        this.express.use('/api', cliente_route_1["default"]);
        this.express.use('/api', parceiro_route_1["default"]);
        this.express.use('/api', plano_route_1["default"]);
    };
    return Routes;
}());
exports["default"] = new Routes().express;
