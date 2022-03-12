import { Model, model, Schema } from 'mongoose';
import { StatusEnum } from '../../shared/enum/Status.enum';
import { IContrato } from './../interfaces/IContrato';

const ContratoSchema = new Schema<IContrato>({
    codigo: { type: String, required: true, unique: true },
    status: { type: Number, enum: StatusEnum, required: true },
    plano: { type: Schema.Types.ObjectId, ref: 'Plano' },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    vendedor: { type: Schema.Types.ObjectId, ref: 'Colaborador' },
    pagamentos: [{ type: Schema.Types.ObjectId, ref: 'Pagamento' }]
}, { timestamps: true });

export const ContratoModel: Model<IContrato> = model<IContrato>('contratos', ContratoSchema);
