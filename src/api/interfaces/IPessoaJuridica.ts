import { Document } from 'mongoose';
import { IPessoa } from './IPessoa';

export interface IPessoaJuridica extends Document {
    _id?: string;
    cnpj: string;
    nomeFantasia: string;
    IE?: string;
    dataFundacao: Date;
    pessoa: IPessoa;
}