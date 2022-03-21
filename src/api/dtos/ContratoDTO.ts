import { StatusEnum } from '../../shared/enum/Status.enum';
import { PagamentoDTO } from './PagamentoDTO';
import { VendaDTO } from './VendaDTO';

export interface ContratoDTO {
    id?: string;
    codigo: string;
    status: StatusEnum;
    venda?: any;
    pagamentos: PagamentoDTO[];
}