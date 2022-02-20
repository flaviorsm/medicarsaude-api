import { IPessoaJuridica } from '../interfaces/IPessoaJuridica';
import { model, Model, Schema } from 'mongoose';

const PessoaJuridicaSchema = new Schema<IPessoaJuridica>({
    cnpj: { type: String, required: true, unique: true },
    nomeFantasia: { type: String },
    IE: { type: String },
    dataFundacao: { type: Date },
    pessoa: { type: Schema.Types.ObjectId, ref: 'Pessoa' }
}, { versionKey: false });

export const PessoaJuridicaModel: Model<IPessoaJuridica> = model<IPessoaJuridica>('PessoaJuridica', PessoaJuridicaSchema);