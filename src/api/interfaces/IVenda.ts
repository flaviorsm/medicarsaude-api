import { Document } from 'mongoose';
import { ICliente } from './ICliente';
import { IColaborador } from './IColaborador';
import { IPlano } from './IPlano';

export interface IVenda extends Document {
    codigo: string;
    cliente: ICliente;
    plano: IPlano;
    vendedor: IColaborador;
    dataVenda: Date;
}