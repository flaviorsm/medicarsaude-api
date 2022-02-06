"use strict";
exports.__esModule = true;
exports.Database = void 0;
var mongoose = require("mongoose");
var logger_1 = require("./../logger/logger");
require('dotenv').config();
var Database = /** @class */ (function () {
    function Database() {
        this.logger = new logger_1.Logger();
        this.connect();
    }
    Database.prototype.connect = function () {
        var _this = this;
        var url = 'mongodb+srv://admin:admin@cluster0.5y686.mongodb.net/medicar-saude?retryWrites=true&w=majority';
        if (!this.conn) {
            mongoose.connect(url);
            this.conn = mongoose.connection;
            this.conn.on('error', function () { return _this.logger.error('Error de conexão'); });
            this.conn.once('open', function () { return _this.logger.info('A conexão com o banco de dados foi bem-sucedida'); });
        }
    };
    Database.prototype.disconnect = function () {
        var _this = this;
        if (this.conn) {
            mongoose.disconnect();
            this.conn.once("close", function () { return _this.logger.info("Desconectado do banco de dados"); });
        }
    };
    return Database;
}());
exports.Database = Database;
