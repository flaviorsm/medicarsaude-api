import { Document } from 'mongoose';
import { IPessoaFisica } from './IPessoaFisica';
import { IPessoaJuridica } from './IPessoaJuridica';
import { IPlano } from './IPlano';

export interface IParceiro extends Document {
    categoria: any;
    status: number;
    planos: IPlano[];
    pessoaFisica?: IPessoaFisica;
    pessoaJuridica?: IPessoaJuridica;
    CRM?: string;
}