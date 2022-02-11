import { PagamentoDTO } from '../dtos/PagamentoDTO';
import { IPagamento } from './../interfaces/IPagamento';
import { ControllerBase } from '../../shared/utils/ControllerBase';
import { PagamentoService } from '../services/PagamentoService';

export class PagamentoController extends ControllerBase<IPagamento, PagamentoDTO, PagamentoService> {

    constructor() {
        super(PagamentoService);
    }
}