import { PessoaFisicaDTO } from './PessoaFisicaDTO';
import { PessoaDTO } from './PessoaDTO';
import { StatusEnum } from "../../shared/enum/Status.enum";
import { RegraEnum } from './../../shared/enum/TipoUsuarioEnum';

export interface UsuarioDTO extends PessoaFisicaDTO {
    senha: string;
    status: StatusEnum;
    regra: RegraEnum;

    pessoaFisica?: any;
    pessoa?: any;
}