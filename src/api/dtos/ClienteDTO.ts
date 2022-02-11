import { StatusEnum } from '../../shared/enum/Status.enum';
import { PessoaFisicaDTO } from './PessoaFisicaDTO';

export interface ClienteDTO extends PessoaFisicaDTO {
    codigo: string;
    status: StatusEnum;

    pessoaFisica?: any;
    pessoa?: any;
    endereco?: any;
}