"use strict";
exports.__esModule = true;
exports.ParceiroModel = void 0;
var mongoose_1 = require("mongoose");
var Status_enum_1 = require("../../shared/enum/Status.enum");
var ParceiroSchema = new mongoose_1.Schema({
    categoria: { type: String, required: true },
    status: { type: String, "enum": Status_enum_1.StatusEnum, required: true },
    pessoaFisica: { type: mongoose_1.Schema.Types.ObjectId, ref: 'PessoaFisica' },
    pessoaJuridica: { type: mongoose_1.Schema.Types.ObjectId, ref: 'PessoaJuridica' },
    CRM: { type: String }
}, { timestamps: true });
exports.ParceiroModel = (0, mongoose_1.model)('Parceiro', ParceiroSchema);
