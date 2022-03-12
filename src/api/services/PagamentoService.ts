import { ServiceBase } from '../../core/ServiceBase';
import APIException from '../../shared/utils/exceptions/APIException';
import { ContratoDTO } from '../dtos/ContratoDTO';
import { PagamentoDTO } from '../dtos/PagamentoDTO';
import { IPagamento } from '../interfaces/IPagamento';
import { PagamentoRepository } from './../repositories/PagamentoRepository';
import { ContratoService } from './ContratoService';
import { PlanoService } from './PlanoService';

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
            contrato: {
                codigo: entity.contrato.codigo,
                status: entity.contrato.status,
                plano: new PlanoService().entityToDTO(entity.contrato.plano),
            }
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
                this.contratoService.update(contrato._id, { pagamentos } as ContratoDTO);
                return res;
            })
            .catch(error => {
                throw new APIException(error);
            });
    }
}