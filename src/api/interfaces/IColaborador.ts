import { Document } from 'mongoose';
import { IPessoaFisica } from './IPessoaFisica';

export interface IColaborador extends Document {
    codigo: string;
    status: string;
    funcao: string;
    dataContratacao: Date;
    ctps: string;
    usuario: boolean;
    pessoaFisica: IPessoaFisica;
}