import { VendaDTO } from '../dtos/VendaDTO';
import { IVenda } from '../interfaces/IVenda';
import { VendaRepository } from '../repositories/VendaRepository';
import { ServiceBase } from '../core/ServiceBase';

export class VendaService extends ServiceBase<IVenda, VendaDTO, VendaRepository> {

    constructor() {
        super(VendaRepository);
    }
}