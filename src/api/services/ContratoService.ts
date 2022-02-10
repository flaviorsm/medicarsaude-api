import { ContratoDTO } from "../dtos/ContratoDTO";
import { IContrato } from "../interfaces/IContrato";
import { ContratoRepository } from "../repositories/ContratoRepository";
import { ServiceAbstract } from './base/ServiceAbstract';

export class ContratoService extends ServiceAbstract<IContrato, ContratoDTO, ContratoRepository> {

    constructor() {
        super(ContratoRepository);
    }
    
}