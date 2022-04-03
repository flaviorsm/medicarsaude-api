import { ControllerBase } from '../../core/ControllerBase';
import { ClienteService } from '../services/ClienteService';
import { ClienteDTO } from './../dtos/ClienteDTO';
import { ICliente } from './../interfaces/ICliente';

export class ClienteController extends ControllerBase<ICliente, ClienteDTO, ClienteService> {

    constructor() {
        super(ClienteService);
    }
}
