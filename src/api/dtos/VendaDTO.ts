import { ColaboradorDTO } from './ColaboradorDTO';
import { PlanoDTO } from './PlanoDTO';
import { ClienteDTO } from './ClienteDTO';

export interface VendaDTO {
    codigo: string;
    cliente: ClienteDTO | string;
    plano: PlanoDTO | string;
    vendedor: ColaboradorDTO | string;
    dataVenda: Date;
}