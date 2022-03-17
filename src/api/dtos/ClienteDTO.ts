import { StatusEnum } from '../../shared/enum/Status.enum';

export interface ClienteDTO {
    id?: string,
    codigo: string,
    nome: string,
    email: string,
    telefone: string,
    cpf: string,
    rg: string,
    dataNascimento: Date,
    status: StatusEnum,
    cep: string,
    rua: string,
    bairro: string,
    cidade: string,
    estado: string,
    endereco?: any,
    pessoaFisica?: any;
    pessoa?: any;
}