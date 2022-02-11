import { Document } from 'mongoose';
import { IPessoa } from './IPessoa';

export interface IPessoaFisica extends Document {
    _id?: string;
    cpf: string;
    rg: string;
    dataNascimento: Date;
    pessoa: IPessoa;
}