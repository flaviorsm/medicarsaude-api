import { ControllerBase } from '../../core/ControllerBase';
import { PagamentoDTO } from '../dtos/PagamentoDTO';
import { PagamentoService } from '../services/PagamentoService';
import { IPagamento } from './../interfaces/IPagamento';

export class PagamentoController extends ControllerBase<IPagamento, PagamentoDTO, PagamentoService> {

    constructor() {
        super(PagamentoService);
    }
}
