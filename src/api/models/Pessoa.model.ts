import { model, Model, Schema } from 'mongoose';
import { IPessoa } from '../interfaces/IPessoa';

const PessoaSchema = new Schema<IPessoa>({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true, unique: true },
    endereco: { type: Schema.Types.ObjectId, ref: 'Endereco' }
}, { versionKey: false });

export const PessoaModel: Model<IPessoa> = model<IPessoa>('Pessoa', PessoaSchema);
