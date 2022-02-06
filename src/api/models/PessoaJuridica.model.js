"use strict";
exports.__esModule = true;
exports.PessoaJuridicaModel = void 0;
var mongoose_1 = require("mongoose");
var PessoaJuridicaSchema = new mongoose_1.Schema({
    cnpj: { type: String, required: true },
    nomeFantasia: { type: String },
    IE: { type: String },
    dataFundacao: { type: Date },
    pessoa: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Pessoa' }
}, { versionKey: false });
exports.PessoaJuridicaModel = (0, mongoose_1.model)('PessoaJuridica', PessoaJuridicaSchema);
