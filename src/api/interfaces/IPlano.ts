import { Document } from 'mongoose';

export interface IPlano extends Document {
    nome: string;
    descricao: string;
    valor: number;
    status: string;
}