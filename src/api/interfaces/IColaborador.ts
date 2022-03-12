import { Document } from 'mongoose';
import { StatusEnum } from '../../shared/enum/Status.enum';
import { IPessoaFisica } from './IPessoaFisica';

export interface IColaborador extends Document {
    codigo: string;
    status: number;
    funcao: string;
    dataContratacao: Date;
    ctps: string;
    usuario: boolean;
    pessoaFisica: IPessoaFisica;
}