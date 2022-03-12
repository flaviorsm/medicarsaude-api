import { ControllerBase } from '../../core/ControllerBase';
import { ColaboradorService } from '../services/ColaboradorServices';
import { ColaboradorDTO } from './../dtos/ColaboradorDTO';
import { IColaborador } from './../interfaces/IColaborador';

export class ColaboradorController extends ControllerBase<IColaborador, ColaboradorDTO, ColaboradorService> {

    constructor() {
        super(ColaboradorService);
    }
}
