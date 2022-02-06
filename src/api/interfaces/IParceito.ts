import { Document } from 'mongoose';
import { IPessoaFisica } from './IPessoaFisica';
import { IPessoaJuridica } from './IPessoaJuridica';

export interface IParceiro extends Document {
    _id?: string;
    categoria: string;
    status: string;
    pessoaFisica?: IPessoaFisica;
    pessoaJuridica?: IPessoaJuridica;
    CRM?: string;
}