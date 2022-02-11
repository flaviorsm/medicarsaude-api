import { Document } from 'mongoose';
import { ICliente } from './ICliente';
import { IColaborador } from './IColaborador';
import { IPagamento } from './IPagamento';
import { IPlano } from './IPlano';

export interface IContrato extends Document {
    codigo: string;
    status: string;
    plano: IPlano;
    cliente: ICliente;
    vendedor: IColaborador;
    pagamentos: IPagamento[];
}