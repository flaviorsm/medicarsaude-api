const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PessoaSchema = new Schema({
    nome: { type: String, required: true },
    endereco: { type: String },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
}, { versionKey: false });

module.exports = mongoose.model('Pessoa', PessoaSchema);
