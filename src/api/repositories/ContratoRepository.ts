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
            .populate({ path: 'pagamentos', model: PagamentoModel })
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
}