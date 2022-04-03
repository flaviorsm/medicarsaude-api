import { PessoaDTO } from './PessoaDTO';

export interface PessoaFisicaDTO {
    cpf: string;
    rg?: string;
    dataNascimento: Date;
    pessoa?: any;
}