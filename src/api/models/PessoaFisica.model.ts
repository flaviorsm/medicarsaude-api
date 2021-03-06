import { model, Model, Schema } from 'mongoose';
import { IPessoaFisica } from '../interfaces/IPessoaFisica';

const PessoaFisicaSchema = new Schema<IPessoaFisica>({
    cpf: { type: String, required: true, unique: true },
    rg: { type: String },
    dataNascimento: { type: Date, required: true },
    pessoa: { type: Schema.Types.ObjectId, ref: 'Pessoa' }
}, { versionKey: false });

export const PessoaFisicaModel: Model<IPessoaFisica> = model<IPessoaFisica>('PessoaFisica', PessoaFisicaSchema);
