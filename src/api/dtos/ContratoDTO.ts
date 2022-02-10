import { ColaboradorDTO } from './ColaboradorDTO';
import { ClienteDTO } from './ClienteDTO';
import { PlanoDTO } from './PlanoDTO';
import { StatusEnum } from '../../shared/enum/Status.enum';
import { PagamentoDTO } from './PagamentoDTO';

export interface ContratoDTO {
    codigo: string;
    status: StatusEnum;
    plano: PlanoDTO;
    cliente: ClienteDTO;
    vendedor: ColaboradorDTO;
    pagamentos: PagamentoDTO[];

}