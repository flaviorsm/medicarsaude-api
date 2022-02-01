const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
    codigo: { type: String, required: true },
    status: { type: String, enum: ['ATIVO', 'SUSPENSO', 'INATIVO',] },
    pessoaFisica:  { type: mongoose.Schema.Types.ObjectId, ref: 'PessoaFisica' }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', ClienteSchema);
