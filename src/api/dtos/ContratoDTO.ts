import { StatusEnum } from '../../shared/enum/Status.enum';
import { PagamentoDTO } from './PagamentoDTO';
import { PlanoDTO } from './PlanoDTO';

export interface ContratoDTO {
    id?: string;
    codigo: string;
    status: StatusEnum;
    plano: PlanoDTO;
    cliente: any;
    vendedor: any;
    pagamentos: PagamentoDTO[];
}