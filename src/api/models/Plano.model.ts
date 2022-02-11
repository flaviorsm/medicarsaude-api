import { Model, Schema, model } from 'mongoose';
import { StatusEnum } from '../../shared/enum/Status.enum';
import { IPlano } from '../interfaces/IPlano';

const PlanoSchema = new Schema<IPlano>({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    valor: { type: Number, required: true },
    status: { type: String, enum: StatusEnum, required: true },
}, { timestamps: true });

export const PlanoModel: Model<IPlano> = model<IPlano>('planos', PlanoSchema);