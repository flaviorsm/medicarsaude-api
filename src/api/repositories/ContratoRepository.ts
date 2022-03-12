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
            .populate({ path: 'plano', model: PlanoModel, select: '-_id' })
            .populate({
                path: 'cliente', model: ClienteModel, select: 'pessoaFisica -_id',
                populate: {
                    path: 'pessoaFisica', select: 'cpf pessoa -_id',
                    populate: {
                        path: 'pessoa', select: 'nome email telefone -_id'
                    }
                }
            })
            .populate({
                path: 'vendedor', model: ColaboradorModel, select: 'codigo pessoaFisica -_id',
                populate: {
                    path: 'pessoaFisica', select: 'pessoa -_id',
                    populate: {
                        path: 'pessoa', select: 'nome email telefone -_id'
                    }
                }
            })
            .populate({ path: 'pagamentos', model: PagamentoModel });
    }
}
