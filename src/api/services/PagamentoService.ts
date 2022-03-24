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
            id: entity._id,
            codigo: entity.codigo,
            dataPagamento: entity.dataPagamento,
            dataVencimento: entity.dataVencimento,
            referencia: entity.referencia,
            status: entity.status,
            valorPago: entity.valorPago,
            contrato: entity.contrato,
        }
    }

    async create(dto: PagamentoDTO): Promise<IPagamento> {
        return await this.repository.create(dto)
            .then(async res => {
                const contrato = await this.contratoService.findById(dto.contrato);
                const pagamentos = [];
                for (const pg of contrato.pagamentos) {
                    pagamentos.push(pg);
                }
                pagamentos.push(res._id);
                return this.contratoService.patch(contrato._id, { pagamentos }).then(() =>{
                    return res;
                });
            })
            .catch(error => {
                throw new APIException(error);
            });
    }
}