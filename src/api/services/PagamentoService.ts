import { PagamentoDTO } from "../dtos/PagamentoDTO";
import { IPagamento } from "../interfaces/IPagamento";
import { PagamentoRepository } from './../repositories/PagamentoRepository';
import { ServiceAbstract } from "./base/ServiceAbstract";

export class PagamentoService extends ServiceAbstract<IPagamento, PagamentoDTO, PagamentoRepository> {
    
    constructor() {
        super(PagamentoRepository);
    }
}