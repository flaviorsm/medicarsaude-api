import { ServiceBase } from '../../core/ServiceBase';
import { ContratoDTO } from '../dtos/ContratoDTO';
import { IContrato } from '../interfaces/IContrato';
import { ContratoRepository } from '../repositories/ContratoRepository';
import { VendaService } from './VendaService';

export class ContratoService extends ServiceBase<IContrato, ContratoDTO, ContratoRepository> {


    private vendaService: VendaService;
    constructor() {
        super(ContratoRepository);
        this.vendaService = new VendaService();
    }

    entityToDTO(entity: IContrato): ContratoDTO {
        return {
            id: entity?._id,
            codigo: entity?.codigo,
            status: entity?.status,
            venda: this.vendaService.entityToDTO(entity.venda),
            pagamentos: entity?.pagamentos,
        };
    }

}