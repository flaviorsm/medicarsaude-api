import { Document } from 'mongoose';
import { StatusPagamentoEnum } from '../../shared/enum/StatusPagamento.enum';
import { IContrato } from './IContrato';

export interface IPagamento extends Document {
    codigo: string;
    referencia: Date;
    valorPago: number;
    dataVencimento: Date;
    dataPagamento: Date;
    status: StatusPagamentoEnum;
    contrato: IContrato;
}