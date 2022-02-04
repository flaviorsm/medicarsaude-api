"use strict";
exports.__esModule = true;
exports.disconnect = exports.connect = void 0;
var mongoose = require("mongoose");
var logger_1 = require("./../logger/logger");
require('dotenv').config();
var database;
var logger = new logger_1.Logger();
var connect = function () {
    var url = 'mongodb+srv://admin:admin@cluster0.5y686.mongodb.net/medicar-saude?retryWrites=true&w=majority';
    if (!database) {
        mongoose.connect(url);
        database = mongoose.connection;
        database.on('error', function () { return logger.error('Error de conexão'); });
        database.once('open', function () { return logger.info('A conexão com o banco de dados foi bem-sucedida'); });
    }
};
exports.connect = connect;
var disconnect = function () {
    if (database) {
        mongoose.disconnect();
        database.once("close", function () { return logger.info("Desconectado do banco de dados"); });
    }
};
exports.disconnect = disconnect;
exports["default"] = database;
