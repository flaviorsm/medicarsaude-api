import { Model, model, Schema } from 'mongoose';
import { StatusPagamentoEnum } from '../../shared/enum/StatusPagamento.enum';
import { IPagamento } from '../interfaces/IPagamento';

const PagamentoSchema = new Schema<IPagamento>({
    codigo: { type: String, required: true, unique: true },
    referencia: { type: Date },
    valorPago: { type: Number },
    status: { type: Number, enum: StatusPagamentoEnum, required: true },
    dataVencimento: { type: Date },
    dataPagamento: { type: Date },
    contrato: { type: Schema.Types.ObjectId, ref: 'Contrato' },
}, { timestamps: true });

export const PagamentoModel: Model<IPagamento> = model<IPagamento>('pagamentos', PagamentoSchema);