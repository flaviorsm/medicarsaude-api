import { StatusEnum } from "../../shared/enum/Status.enum";
import { RegraEnum } from './../../shared/enum/TipoUsuarioEnum';
import { PessoaFisicaDTO } from './PessoaFisicaDTO';

export interface UsuarioDTO extends PessoaFisicaDTO {
    usuario: string;
    senha: string;
    status: StatusEnum;
    regra: RegraEnum;

    pessoaFisica?: any;
    pessoa?: any;
}