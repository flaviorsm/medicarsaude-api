import { PagamentoDTO } from '../dtos/PagamentoDTO';
import { IPagamento } from '../interfaces/IPagamento';
import { PagamentoModel } from './../models/Pagamento.model';
import { RepositoryBase } from '../core/RepositoryBase';

export class PagamentoRepository extends RepositoryBase<IPagamento, PagamentoDTO> {

    constructor() {
        super(PagamentoModel);
    }
}