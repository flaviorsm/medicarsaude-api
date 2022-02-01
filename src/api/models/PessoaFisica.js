const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PessoaFisicaSchema = new Schema({
    cpf: { type: String, required: true },
    rg: { type: String },
    dataNascimento: { type: String, required: true },
    pessoa: { type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa' },
}, { versionKey: false });

module.exports = mongoose.model('PessoaFisica', PessoaFisicaSchema);
