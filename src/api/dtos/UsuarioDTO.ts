import { TipoUsuarioEnum } from './../../shared/enum/TipoUsuarioEnum';
import { StatusEnum } from "../../shared/enum/Status.enum";

export interface UsuarioDTO {
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    senha: string;
    status: StatusEnum;
    tipo: TipoUsuarioEnum;
}