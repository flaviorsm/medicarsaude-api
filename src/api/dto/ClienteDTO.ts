import { Types } from "mongoose";

export interface ClienteDTO {
    nome: string;
    endereco: string;
    email: string;
    telefone: string;
    cpf: string;
    rg: string;
    dataNascimento: Date,
    codigo: string;
    status: string;
    pessoaFisica: Types.ObjectId;
    pessoa: Types.ObjectId;
}