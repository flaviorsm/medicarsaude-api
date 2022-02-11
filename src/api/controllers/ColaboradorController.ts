import { ControllerBase } from '../../shared/utils/ControllerBase';
import { ColaboradorDTO } from './../dtos/ColaboradorDTO';
import { IColaborador } from './../interfaces/IColaborador';
import { ColaboradorService } from './../services/ColaboradorServices';

export class ColaboradorController extends ControllerBase<IColaborador, ColaboradorDTO, ColaboradorService> {

    constructor() {
        super(ColaboradorService);
    }
}