import { PessoaDTO } from './PessoaDTO';

export interface PessoaJuridicaDTO extends PessoaDTO {
    cnpj: string;
    nomeFantasia: string;
    IE: string;
    dataFundacao: Date;
}