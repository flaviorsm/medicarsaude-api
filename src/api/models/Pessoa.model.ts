import { model, Model, Schema } from 'mongoose';
import { IPessoa } from '../interfaces/IPessoa';
import { PessoaFisicaModel } from './PessoaFisica.model';

const PessoaSchema = new Schema<IPessoa>({
    nome: { type: String, required: true },
    endereco: { type: String },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
}, { versionKey: false });

export const PessoaModel: Model<IPessoa> = model<IPessoa>('Pessoa', PessoaSchema);
