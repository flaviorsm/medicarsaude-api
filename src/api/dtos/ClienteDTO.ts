import { StatusEnum } from '../../shared/enum/Status.enum';

export interface ClienteDTO {
    id?: string,
    nome: string,
    email: string,
    telefone: string,
    cpf: string,
    rg: string,
    dataNascimento: Date,
    codigo: string,
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