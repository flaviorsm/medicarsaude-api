import { PessoaDTO } from './PessoaDTO';

export interface PessoaFisicaDTO extends PessoaDTO {
    cpf: string;
    rg: string;
    dataNascimento: Date;
}