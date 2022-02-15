import { Document } from 'mongoose';
import { TipoUsuarioEnum } from '../../shared/enum/TipoUsuarioEnum';
import { StatusEnum } from './../../shared/enum/Status.enum';
import { IPessoaFisica } from './IPessoaFisica';

export interface IUsuario extends Document {
    email: string;
    senha: string;
    tipo: TipoUsuarioEnum;
    status: StatusEnum;
    pessoaFisica: IPessoaFisica;
}