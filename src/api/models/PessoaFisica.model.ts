import { model, Model, Schema } from 'mongoose';
import { IPessoa } from './Pessoa.model';

export interface IPessoaFisica extends Document {
    cpf: string;
    rg: string;
    dataNascimento: Date;
    pessoa: IPessoa;
}

const PessoaFisicaSchema = new Schema<IPessoaFisica>({
    cpf: { type: String, required: true },
    rg: { type: String },
    dataNascimento: { type: Date, required: true },
    pessoa: { type: Schema.Types.ObjectId, ref: 'Pessoa' },
}, { versionKey: false });

export const PessoaFisicaModel: Model<IPessoaFisica> = model<IPessoaFisica>('PessoaFisica', PessoaFisicaSchema);
