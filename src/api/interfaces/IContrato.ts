import { Document } from 'mongoose';
import { IPagamento } from './IPagamento';
import { IVenda } from './IVenda';

export interface IContrato extends Document {
    codigo: string;
    status: number;
    venda: IVenda;
    pagamentos: IPagamento[];
}