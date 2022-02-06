"use strict";
exports.__esModule = true;
exports.ServiceBase = void 0;
var EnderecoRepository_1 = require("../../api/repositories/EnderecoRepository");
var PessoaFisicaRepository_1 = require("../../api/repositories/PessoaFisicaRepository");
var PessoaRepository_1 = require("../../api/repositories/PessoaRepository");
var db_config_1 = require("../../config/db.config");
var logger_1 = require("../logger/logger");
var PessoaJuridicaRepository_1 = require("../../api/repositories/PessoaJuridicaRepository");
var ServiceBase = /** @class */ (function () {
    function ServiceBase() {
        this.logger = new logger_1.Logger();
        this.database = new db_config_1.Database();
        this.pessoaRepository = new PessoaRepository_1.PessoaRepository();
        this.pessoaFisicaRepository = new PessoaFisicaRepository_1.PessoaFisicaRepository();
        this.pessoaJuridicaRepository = new PessoaJuridicaRepository_1.PessoaJuridicaRepository();
        this.enderecoRepository = new EnderecoRepository_1.EnderecoRepository();
    }
    return ServiceBase;
}());
exports.ServiceBase = ServiceBase;
