import { VendaDTO } from "../dtos/VendaDTO";
import { IVenda } from "../interfaces/IVenda";
import { VendaRepository } from "../repositories/VendaRepository";
import { ServiceAbstract } from './base/ServiceAbstract';

export class VendaService extends ServiceAbstract<IVenda, VendaDTO, VendaRepository> {

    constructor() {
        super(VendaRepository);
    }
}