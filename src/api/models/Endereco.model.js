"use strict";
exports.__esModule = true;
exports.EnderecoModel = void 0;
var mongoose_1 = require("mongoose");
var EnderecoSchema = new mongoose_1.Schema({
    cep: { type: String, required: true },
    rua: { type: String, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true, maxlength: 2 }
}, { versionKey: false });
exports.EnderecoModel = (0, mongoose_1.model)('Endereco', EnderecoSchema);
