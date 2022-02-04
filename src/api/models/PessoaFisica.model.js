"use strict";
exports.__esModule = true;
exports.PessoaFisicaModel = void 0;
var mongoose_1 = require("mongoose");
var PessoaFisicaSchema = new mongoose_1.Schema({
    cpf: { type: String, required: true },
    rg: { type: String },
    dataNascimento: { type: Date, required: true },
    pessoa: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Pessoa' }
}, { versionKey: false });
exports.PessoaFisicaModel = (0, mongoose_1.model)('PessoaFisica', PessoaFisicaSchema);
