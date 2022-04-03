import { model, Model, Schema } from 'mongoose';
import { StatusEnum } from '../../shared/enum/Status.enum';
import { IParceiro } from '../interfaces/IParceito';

const ParceiroSchema = new Schema<IParceiro>({
    categoria: { type: Object, required: true },
    status: { type: Number, enum: StatusEnum, required: true },
    planos: [{ type: Schema.Types.ObjectId, ref: 'Plano' }],
    pessoaFisica: { type: Schema.Types.ObjectId, ref: 'PessoaFisica' },
    pessoaJuridica: { type: Schema.Types.ObjectId, ref: 'PessoaJuridica' },
    CRM: { type: String, unique: true },

}, { timestamps: true });

export const ParceiroModel: Model<IParceiro> = model<IParceiro>('Parceiro', ParceiroSchema);