import { PessoaFisicaDTO } from './PessoaFisicaDTO';
import { PessoaDTO } from './PessoaDTO';
import { StatusEnum } from "../../shared/enum/Status.enum";
import { TipoUsuarioEnum } from './../../shared/enum/TipoUsuarioEnum';

export interface UsuarioDTO extends PessoaFisicaDTO {
    senha: string;
    status: StatusEnum;
    tipo: TipoUsuarioEnum;

    pessoaFisica?: any;
    pessoa?: any;
}