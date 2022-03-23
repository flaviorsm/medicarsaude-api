import { Model, model, Schema } from 'mongoose';
import { StatusPagamentoEnum } from '../../shared/enum/StatusPagamento.enum';
import { IVenda } from '../interfaces/IVenda';

const VendaSchema = new Schema<IVenda>({
    codigo: { type: String, required: true, unique: true },
    statusPagamento: { type: Number, enum: StatusPagamentoEnum, default: StatusPagamentoEnum.PENDENTE },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    plano: { type: Schema.Types.ObjectId, ref: 'Plano' },
    vendedor: { type: Schema.Types.ObjectId, ref: 'Colaborador' },
    dataVenda: { type: Date, required: true },
    diaVencimento: { type: Number, required: true },
    contrato: { type: Schema.Types.ObjectId, ref: 'Contrato' }
}, { timestamps: true });

export const VendaModel: Model<IVenda> = model<IVenda>('vendas', VendaSchema);
