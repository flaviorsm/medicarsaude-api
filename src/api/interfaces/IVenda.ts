import { IContrato } from './IContrato';
import { Document } from 'mongoose';
import { StatusPagamentoEnum } from './../../shared/enum/StatusPagamento.enum';
import { ICliente } from './ICliente';
import { IColaborador } from './IColaborador';
import { IPlano } from './IPlano';

export interface IVenda extends Document {
    codigo: string;
    statusPagamento: StatusPagamentoEnum;
    plano: IPlano;
    cliente: ICliente;
    vendedor: IColaborador;
    dataVenda: Date;
    contrato: IContrato;
}