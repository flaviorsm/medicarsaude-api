import { model, Model, Schema } from 'mongoose';
import { StatusEnum } from '../../shared/enum/Status.enum';
import { IParceiro } from '../interfaces/IParceito';

const ParceiroSchema = new Schema<IParceiro>({
    categoria: { type: String, required: true },
    status: { type: String, enum: StatusEnum, required: true },
    pessoaFisica: { type: Schema.Types.ObjectId, ref: 'PessoaFisica' },
    pessoaJuridica: { type: Schema.Types.ObjectId, ref: 'PessoaJuridica' },
    CRM: { type: String, unique: true },

}, { timestamps: true });

export const ParceiroModel: Model<IParceiro> = model<IParceiro>('Parceiro', ParceiroSchema);