import { PagamentoDTO } from '../dtos/PagamentoDTO';
import { IPagamento } from '../interfaces/IPagamento';
import { PagamentoRepository } from './../repositories/PagamentoRepository';
import { ServiceBase } from '../core/ServiceBase';

export class PagamentoService extends ServiceBase<IPagamento, PagamentoDTO, PagamentoRepository> {

    constructor() {
        super(PagamentoRepository);
    }
}