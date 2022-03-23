import { StatusPagamentoEnum } from "../../shared/enum/StatusPagamento.enum";

export interface PagamentoDTO {
    id?: string;
    codigo: string;
    referencia: Date;
    valorPago: number;
    dataVencimento: Date;
    dataPagamento: Date;
    status: StatusPagamentoEnum;
    contrato?: any;
}