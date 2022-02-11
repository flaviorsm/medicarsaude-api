import { PessoaFisicaDTO } from './PessoaFisicaDTO';
import { PessoaJuridicaDTO } from './PessoaJuridicaDTO';
export interface ParceiroDTO extends PessoaFisicaDTO, PessoaJuridicaDTO {
    categoria: string;
    status: string;
    crm: string;
    pessoa?: any;
    pessoaFisica?: any;
    pessoaJuridica?: any;
    endereco?: any;
}