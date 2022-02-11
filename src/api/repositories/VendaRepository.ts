import { IVenda } from "../interfaces/IVenda";
import { VendaDTO } from './../dtos/VendaDTO';
import { VendaModel } from './../models/Venda.model';
import { RepositoryBase } from '../core/RepositoryBase';

export class VendaRepository extends RepositoryBase<IVenda, VendaDTO> {

    constructor() {
        super(VendaModel);
    }
}