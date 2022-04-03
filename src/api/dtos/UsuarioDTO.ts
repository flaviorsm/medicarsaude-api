import { StatusEnum } from "../../shared/enum/Status.enum";
import { RegraEnum } from './../../shared/enum/TipoUsuarioEnum';
import { PessoaFisicaDTO } from './PessoaFisicaDTO';

export interface UsuarioDTO {
    id: string;
    usuario: string;
    senha?: string;
    status: StatusEnum;
    regra: RegraEnum;

    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    dataNascimento: Date;

    token?: string;
    pessoaFisica?: any;
    pessoa?: any;
}