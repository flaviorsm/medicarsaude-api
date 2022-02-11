import { StatusEnum } from './../../shared/enum/Status.enum';
import { PessoaFisicaDTO } from './PessoaFisicaDTO';

export interface ColaboradorDTO extends PessoaFisicaDTO {
    codigo: string;
    status: StatusEnum;
    funcao: string;
    dataContratacao: Date;
    ctps: string;
    usuario: boolean;

    pessoaFisica?: any;
    pessoa?: any;
    endereco?: any;
}