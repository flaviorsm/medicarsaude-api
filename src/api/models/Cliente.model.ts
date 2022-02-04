import { model, Model, Schema } from 'mongoose';
import { IPessoaFisica } from './PessoaFisica.model';

export interface ICliente extends Document {
    codigo: string;
    status: string;
    pessoaFisica: IPessoaFisica;
}

const ClienteSchema = new Schema<ICliente>({
    codigo: { type: String, required: true },
    status: { type: String, enum: ['ATIVO', 'SUSPENSO', 'INATIVO',] },
    pessoaFisica:  { type: Schema.Types.ObjectId, ref: 'PessoaFisica' }
}, { timestamps: true });

export const ClienteModel: Model<ICliente> = model<ICliente>('clientes', ClienteSchema);
