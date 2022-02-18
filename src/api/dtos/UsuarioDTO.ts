import { StatusEnum } from "../../shared/enum/Status.enum";
import { TipoUsuarioEnum } from './../../shared/enum/TipoUsuarioEnum';

export interface UsuarioDTO {
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    senha: string;
    status: StatusEnum;
    tipo: TipoUsuarioEnum;
    pessoaFisica?: string;
}