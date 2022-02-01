const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PessoaJuridicaSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nomeFantasia: { type: String, required: true },
    cnpj: { type: String, required: true },
    inscricaoEstadual: { type: String },
    dataFundacao: { type: String },
    idPessoa: { type: String },
});

module.exports = mongoose.model('PessoaJuridica', PessoaJuridicaSchema);
