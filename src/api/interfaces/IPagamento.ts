import { Document } from 'mongoose';
import { IContrato } from "./IContrato";

export interface IPagamento extends Document {
    codigo: string;
    referencia: Date;
    valorPago: number;
    dataVencimento: Date;
    dataPagamento: Date;
    status: string;
    contrato: IContrato;
} 