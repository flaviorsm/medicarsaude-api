import { Model, model, Schema } from 'mongoose';
import { StatusEnum } from '../../shared/enum/Status.enum';
import { IPagamento } from '../interfaces/IPagamento';

const PagamentoSchema = new Schema<IPagamento>({
    codigo: { type: String, required: true, unique: true },
    status: { type: String, enum: StatusEnum, required: true },
    dataVencimento: { type: Date },
    dataPagamento: { type: Date },
    contrato: { type: Schema.Types.ObjectId, ref: 'Contrato' },
}, { timestamps: true });

export const PagamentoModel: Model<IPagamento> = model<IPagamento>('pagamentos', PagamentoSchema);