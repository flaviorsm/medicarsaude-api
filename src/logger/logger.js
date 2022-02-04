"use strict";
exports.__esModule = true;
exports.Logger = void 0;
var pine = require('pine');
var logger = pine();
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.info = function (message, data) {
        logger.info("".concat(message, "   ").concat(undefined !== data ? JSON.stringify(data) : ''));
    };
    Logger.prototype.error = function (message) {
        logger.error(message);
    };
    return Logger;
}());
exports.Logger = Logger;
