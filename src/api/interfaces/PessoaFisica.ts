import { Document } from 'mongoose';
import { Pessoa } from './Pessoa';

export interface PessoaFisica extends Document {
    _id?: string;
    cpf: string;
    rg: string;
    dataNascimento: Date;
    pessoa: Pessoa;
}