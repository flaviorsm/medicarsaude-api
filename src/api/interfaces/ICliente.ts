import { Document } from 'mongoose';
import { IPessoaFisica } from './IPessoaFisica';

export interface ICliente extends Document {
    codigo: string;
    status: number;
    pessoaFisica: IPessoaFisica;
}
