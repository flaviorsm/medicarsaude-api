"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var http = require("http");
var logger_1 = require("./logger/logger");
require('dotenv').config();
var port = process.env.PORT || 3000;
var logger = new logger_1.Logger();
app_1["default"].set('port', port);
var server = http.createServer(app_1["default"]);
server.listen(port);
server.on('listening', function () {
    var addr = server.address();
    var bind = (typeof addr === 'string') ? "pipe ".concat(addr) : "port ".concat(addr.port);
    logger.info("Escutando em ".concat(bind));
});
module.exports = app_1["default"];
