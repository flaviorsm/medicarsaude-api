import { PlanoService } from './../services/PlanoService';
import { PlanoDTO } from './../dtos/PlanoDTO';
import { IPlano } from './../interfaces/IPlano';
import { ControllerBase } from '../../shared/utils/ControllerBase';

export class PlanoController extends ControllerBase<IPlano, PlanoDTO, PlanoService> {
    constructor() {
        super(PlanoService);
    }
}