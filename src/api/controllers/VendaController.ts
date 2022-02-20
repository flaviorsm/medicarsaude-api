import { VendaService } from './../services/VendaService';
import { VendaDTO } from './../dtos/VendaDTO';
import { IVenda } from './../interfaces/IVenda';
import { ControllerBase } from '../../core/ControllerBase';

export class VendaController extends ControllerBase<IVenda, VendaDTO, VendaService> {
    constructor() {
        super(VendaService);
    }
}