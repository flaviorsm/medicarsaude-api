import { ServiceBase } from '../../core/ServiceBase';
import APIException from '../../shared/utils/exceptions/APIException';
import { ContratoDTO } from '../dtos/ContratoDTO';
import { PagamentoDTO } from '../dtos/PagamentoDTO';
import { IPagamento } from '../interfaces/IPagamento';
import { PagamentoRepository } from './../repositories/PagamentoRepository';
import { ContratoService } from './ContratoService';

export class PagamentoService extends ServiceBase<IPagamento, PagamentoDTO, PagamentoRepository> {

    private contratoService: ContratoService;

    constructor() {
        super(PagamentoRepository);
        this.contratoService = new ContratoService();
    }

    entityToDTO(entity: IPagamento): PagamentoDTO {
        return {
            id: entity?._id,
            codigo: entity?.codigo,
            dataPagamento: entity?.dataPagamento,
            dataVencimento: entity?.dataVencimento,
            referencia: entity?.referencia,
            status: entity?.status,
            valorPago: entity?.valorPago,
            contrato: entity?.contrato,
        }
    }

    async createList(pagamentos: PagamentoDTO[]): Promise<IPagamento[]> {
        const pagamentosEntity: IPagamento[] = [];
        for (const dto of pagamentos) {
            await this.repository.create(dto)
                .then(async pag => {
                    await this.contratoService.findByIdAndUpdate(dto.contrato, pag._id);
                    pagamentosEntity.push(pag);
                })
                .catch(error => {
                    throw new APIException(error);
                });
        }
        return pagamentosEntity;
    }
}