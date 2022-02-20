import { Document } from 'mongoose';
import { RegraEnum } from '../../shared/enum/TipoUsuarioEnum';
import { StatusEnum } from './../../shared/enum/Status.enum';
import { IPessoaFisica } from './IPessoaFisica';

export interface IUsuario extends Document {
    email: string;
    senha: string;
    regra: RegraEnum;
    status: StatusEnum;
    pessoaFisica: IPessoaFisica;
}