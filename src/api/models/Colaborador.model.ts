import { model, Model, Schema } from 'mongoose';
import { StatusEnum } from '../../shared/enum/Status.enum';
import { IColaborador } from './../interfaces/IColaborador';

const ColaboradorSchema = new Schema<IColaborador>({
    codigo: { type: String, required: true, unique: true },
    status: { type: Number, enum: StatusEnum, required: true },
    funcao: { type: String },
    dataContratacao: { type: Date },
    ctps: { type: String, unique: true },
    usuario: { type: Boolean },
    pessoaFisica: { type: Schema.Types.ObjectId, ref: 'PessoaFisica' }
}, { timestamps: true });

export const ColaboradorModel: Model<IColaborador> = model<IColaborador>('colaboradores', ColaboradorSchema);