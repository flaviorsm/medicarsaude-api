import { ControllerBase } from '../../shared/utils/ControllerBase';
import { PlanoDTO } from './../dtos/PlanoDTO';
import { IPlano } from './../interfaces/IPlano';
import { PlanoService } from './../services/PlanoService';

export class PlanoController extends ControllerBase<IPlano, PlanoDTO, PlanoService> {
    constructor() {
        super(PlanoService);
    }
}