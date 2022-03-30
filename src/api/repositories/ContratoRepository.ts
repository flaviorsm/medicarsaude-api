import { EnderecoModel } from './../models/Endereco.model';
import { VendaModel } from './../models/Venda.model';
import { RepositoryBase } from '../../core/RepositoryBase';
import { ContratoDTO } from '../dtos/ContratoDTO';
import { IContrato } from '../interfaces/IContrato';
import { PagamentoModel } from '../models/Pagamento.model';
import { PlanoModel } from '../models/Plano.model';
import { ClienteModel } from './../models/Cliente.model';
import { ColaboradorModel } from './../models/Colaborador.model';
import { ContratoModel } from './../models/Contrato.model';

export class ContratoRepository extends RepositoryBase<IContrato, ContratoDTO> {

    constructor() {
        super(ContratoModel);
    }

    async find(query: any): Promise<IContrato[]> {
        return await ContratoModel
            .find(query)
            .populate({ path: 'pagamentos', model: PagamentoModel }).sort('-dataVencimento')
            .populate({
                path: 'venda', model: VendaModel, select: '-_id',
                populate: [{
                    path: 'plano', model: PlanoModel, select: '-_id',
                },
                {
                    path: 'cliente', model: ClienteModel,
                    populate: {
                        path: 'pessoaFisica', select: 'cpf dataNascimento pessoa -_id',
                        populate: {
                            path: 'pessoa', select: 'nome email telefone -_id',
                            populate: {
                                path: 'endereco', model: EnderecoModel, select: '-_id',
                            }
                        }
                    }
                },
                {
                    path: 'vendedor', model: ColaboradorModel,
                    populate: {
                        path: 'pessoaFisica', select: 'pessoa -_id',
                        populate: {
                            path: 'pessoa', select: 'nome email telefone -_id'
                        }
                    }
                }]
            });
    }

    async findByIdAndUpdate(contratoId: string, pagamentoId: string): Promise<void> {
        await ContratoModel.findByIdAndUpdate(contratoId, { $push: { pagamentos: pagamentoId } }, { new: true, useFindAndModify: false });
    }

    async recordsActive() {
        const result = {ativos: 0, total: 0 };
        result.ativos = await ContratoModel.aggregate([
            {
                $match: {
                    status: 0
                }
            },
            {
                $count: 'ativos'
            }
        ]).then(res => res[0].ativos);

        result.total = await ContratoModel.count();

        return result;
    }
}