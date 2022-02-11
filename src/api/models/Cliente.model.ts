import { model, Model, Schema } from 'mongoose';
import { StatusEnum } from '../../shared/enum/Status.enum';
import { ICliente } from '../interfaces/ICliente';

const ClienteSchema = new Schema<ICliente>({
    codigo: { type: String, required: true },
    status: { type: String, enum: StatusEnum, required: true },
    pessoaFisica: { type: Schema.Types.ObjectId, ref: 'PessoaFisica' }
}, { timestamps: true });

export const ClienteModel: Model<ICliente> = model<ICliente>('clientes', ClienteSchema);
