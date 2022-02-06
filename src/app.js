"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var routes_1 = require("./routes/routes");
var swaggerUi = require('swagger-ui-express');
var swaggerFile = require('../swagger.json');
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.middleware();
        this.routes();
        this.swagger();
    }
    App.prototype.swagger = function () {
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    };
    App.prototype.middleware = function () {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    };
    App.prototype.routes = function () {
        this.express.use('/', routes_1["default"]);
    };
    return App;
}());
exports["default"] = new App().express;
