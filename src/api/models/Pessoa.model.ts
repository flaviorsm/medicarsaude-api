import { Schema, model, Model } from 'mongoose';

export interface IPessoa extends Document {
    nome: string;
    endereco: string;
    email: string;
    telefone: string;
}

const PessoaSchema = new Schema<IPessoa>({
    nome: { type: String, required: true },
    endereco: { type: String },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
}, { versionKey: false });

export const PessoaModel: Model<IPessoa> = model<IPessoa>('Pessoa', PessoaSchema);
