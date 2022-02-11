import { ContratoDTO } from '../dtos/ContratoDTO';
import { IContrato } from '../interfaces/IContrato';
import { ContratoRepository } from '../repositories/ContratoRepository';
import { ServiceBase } from '../core/ServiceBase';

export class ContratoService extends ServiceBase<IContrato, ContratoDTO, ContratoRepository> {

    constructor() {
        super(ContratoRepository);
    }

}