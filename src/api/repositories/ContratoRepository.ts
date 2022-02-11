import { RepositoryBase } from '../core/RepositoryBase';
import { ContratoDTO } from '../dtos/ContratoDTO';
import { IContrato } from '../interfaces/IContrato';
import { ContratoModel } from './../models/Contrato.model';

export class ContratoRepository extends RepositoryBase<IContrato, ContratoDTO> {

    constructor() {
        super(ContratoModel);
    }
}
