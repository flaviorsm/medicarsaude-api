import { ContratoDTO } from '../dtos/ContratoDTO';
import { ControllerBase } from '../../shared/utils/ControllerBase';
import { IContrato } from '../interfaces/IContrato';
import { ContratoService } from '../services/ContratoService';

export class ContratoController extends ControllerBase<IContrato, ContratoDTO, ContratoService> {

    constructor() {
        super(ContratoService);
    }
}