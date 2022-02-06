"use strict";
exports.__esModule = true;
exports.ClienteModel = void 0;
var mongoose_1 = require("mongoose");
var Status_enum_1 = require("../../shared/enum/Status.enum");
var ClienteSchema = new mongoose_1.Schema({
    codigo: { type: String, required: true },
    status: { type: String, "enum": Status_enum_1.StatusEnum, required: true },
    pessoaFisica: { type: mongoose_1.Schema.Types.ObjectId, ref: 'PessoaFisica' }
}, { timestamps: true });
exports.ClienteModel = (0, mongoose_1.model)('clientes', ClienteSchema);
