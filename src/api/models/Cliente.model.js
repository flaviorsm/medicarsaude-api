"use strict";
exports.__esModule = true;
exports.ClienteModel = void 0;
var mongoose_1 = require("mongoose");
var ClienteSchema = new mongoose_1.Schema({
    codigo: { type: String, required: true },
    status: { type: String, "enum": ['ATIVO', 'SUSPENSO', 'INATIVO',] },
    pessoaFisica: { type: mongoose_1.Schema.Types.ObjectId, ref: 'PessoaFisica' }
}, { timestamps: true });
exports.ClienteModel = (0, mongoose_1.model)('clientes', ClienteSchema);
