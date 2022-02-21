import { PagamentoDTO } from '../dtos/PagamentoDTO';
import { IPagamento } from '../interfaces/IPagamento';
import { PagamentoRepository } from './../repositories/PagamentoRepository';
import { ServiceBase } from '../../core/ServiceBase';
import APIException from '../../shared/utils/exceptions/APIException';
import { ContratoRepository } from '../repositories/ContratoRepository';
import { ContratoDTO } from '../dtos/ContratoDTO';

export class PagamentoService extends ServiceBase<IPagamento, PagamentoDTO, PagamentoRepository> {

    contratoRepository: ContratoRepository;

    constructor() {
        super(PagamentoRepository);
        this.contratoRepository = new ContratoRepository();
    }

    async create(dto: PagamentoDTO): Promise<IPagamento> {
        return await this.repository.create(dto)
            .then(async res => {
                const contrato = await this.contratoRepository.findById(dto.contrato);
                const pagamentos = [];
                for (const pg of contrato.pagamentos) {
                    pagamentos.push(pg);
                }
                pagamentos.push(res._id);
                this.contratoRepository.update(contrato._id, { pagamentos } as ContratoDTO);
                return res;
            })
            .catch(error => {
                throw new APIException(error);
            });
    }
}