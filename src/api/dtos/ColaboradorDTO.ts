import { StatusEnum } from './../../shared/enum/Status.enum';

export interface ColaboradorDTO {
    id?: string;
    codigo: string;
    status: StatusEnum;
    funcao: string;
    dataContratacao: Date;
    ctps: string;
    usuario: boolean;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    rg: string;
    dataNascimento: Date;
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    pessoaFisica?: any;
    pessoa?: any;
    endereco?: any;
}