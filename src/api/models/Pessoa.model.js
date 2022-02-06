"use strict";
exports.__esModule = true;
exports.PessoaModel = void 0;
var mongoose_1 = require("mongoose");
var PessoaSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    endereco: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Endereco' }
}, { versionKey: false });
exports.PessoaModel = (0, mongoose_1.model)('Pessoa', PessoaSchema);
