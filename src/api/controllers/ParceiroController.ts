import { ControllerBase } from '../../core/ControllerBase';
import { IParceiro } from '../interfaces/IParceito';
import { ParceiroService } from '../services/ParceiroService';
import { ParceiroDTO } from './../dtos/ParceiroDTO';

export class ParceiroController extends ControllerBase<IParceiro, ParceiroDTO, ParceiroService> {

    constructor() {
        super(ParceiroService);
    }
}