import { PessoaFisicaDTO } from './PessoaFisicaDTO';
import { PessoaJuridicaDTO } from './PessoaJuridicaDTO';
export interface ParceiroDTO extends PessoaFisicaDTO, PessoaJuridicaDTO {
    //Parceiro
    categoria: string;
    status: string;
    CRM: string;

    pessoa?: any;
    pessoaFisica?: any;
    pessoaJuridica?: any;
    endereco?: any;
}