import { Model, model, Schema } from 'mongoose';
import { StatusEnum } from '../../shared/enum/Status.enum';
import { TipoUsuarioEnum } from '../../shared/enum/TipoUsuarioEnum';
import { IUsuario } from '../interfaces/IUsuario';

const UsuarioSchema = new Schema<IUsuario>({
    email: { type: String, required: true },
    senha: { type: String, required: true, select: false },
    tipo: { type: Number, enum: TipoUsuarioEnum,  required: true, default: TipoUsuarioEnum.CLIENTE },
    status: { type: Number, enum: StatusEnum, required: true, default: StatusEnum.ATIVO },
    pessoaFisica: { type: Schema.Types.ObjectId, ref: 'PessoaFisica' }
}, { timestamps: true });

export const UsuarioModel: Model<IUsuario> = model<IUsuario>('usuarios', UsuarioSchema);