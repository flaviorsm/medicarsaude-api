import { Model, Schema, model } from 'mongoose';
import { IVenda } from '../interfaces/IVenda';

const VendaSchema = new Schema<IVenda>({
    codigo: { type: String, required: true },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    plano: { type: Schema.Types.ObjectId, ref: 'Plano' },
    vendedor: { type: Schema.Types.ObjectId, ref: 'Colaborador' },
    dataVenda: { type: Date, required: true }
});

export const VendaModel: Model<IVenda> = model<IVenda>('vendas', VendaSchema);
