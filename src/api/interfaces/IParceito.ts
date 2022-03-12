import { Document } from 'mongoose';
import { IPessoaFisica } from './IPessoaFisica';
import { IPessoaJuridica } from './IPessoaJuridica';

export interface IParceiro extends Document {
    categoria: string;
    status: number;
    pessoaFisica?: IPessoaFisica;
    pessoaJuridica?: IPessoaJuridica;
    CRM?: string;
}