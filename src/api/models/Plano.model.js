"use strict";
exports.__esModule = true;
exports.PlanoModel = void 0;
var mongoose_1 = require("mongoose");
var Status_enum_1 = require("../../shared/enum/Status.enum");
var PlanoSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    valor: { type: Number, required: true },
    status: { type: String, "enum": Status_enum_1.StatusEnum, required: true }
});
exports.PlanoModel = (0, mongoose_1.model)('planos', PlanoSchema);
