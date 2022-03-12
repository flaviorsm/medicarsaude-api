import { ContratoModel } from './../models/Contrato.model';
import { RepositoryBase } from '../../core/RepositoryBase';
import { PagamentoDTO } from '../dtos/PagamentoDTO';
import { IPagamento } from '../interfaces/IPagamento';
import { PagamentoModel } from './../models/Pagamento.model';
import { PlanoModel } from '../models/Plano.model';

export class PagamentoRepository extends RepositoryBase<IPagamento, PagamentoDTO> {

    constructor() {
        super(PagamentoModel);
    }

    async find(query: any) {
        return await PagamentoModel.find(query).populate({
            path: 'contrato', model: ContratoModel, select: '-id',
            populate: {
                path: 'plano', model: PlanoModel, select: '-id'
            }
        });
    }

    async findOne(query: any) {
        return await PagamentoModel.findOne(query).populate({
            path: 'contrato', model: ContratoModel,
            populate: {
                path: 'plano', model: PlanoModel, select: '-id'
            }
        });
    }

    async findById(id: string) {
        return await PagamentoModel.findById(id).populate({
            path: 'contrato', model: ContratoModel,
            populate: {
                path: 'plano', model: PlanoModel, select: '-id'
            }
        });
    }
}