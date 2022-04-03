import { StatusPagamentoEnum } from "../../shared/enum/StatusPagamento.enum";
import { ContratoDTO } from './ContratoDTO';

export interface VendaDTO {
    id?: string;
    codigo: string;
    cliente: any;
    plano: any;
    vendedor: any;
    dataVenda: Date;
    diaVencimento: number;
    statusPagamento: StatusPagamentoEnum;
    contrato?: ContratoDTO;
}