import { ContratoModel } from './../models/Contrato.model';
import { ColaboradorModel } from './../models/Colaborador.model';
import { PlanoModel } from './../models/Plano.model';
import { IVenda } from '../interfaces/IVenda';
import { VendaDTO } from './../dtos/VendaDTO';
import { VendaModel } from './../models/Venda.model';
import { RepositoryBase } from '../../core/RepositoryBase';
import { ClienteModel } from '../models/Cliente.model';

export class VendaRepository extends RepositoryBase<IVenda, VendaDTO> {

    constructor() {
        super(VendaModel);
    }

    async find(query: any = {}) {
        return await VendaModel.find(query)
            .populate({ path: 'contrato', model: ContratoModel, select: '-venda' })
            .populate({ path: 'plano', model: PlanoModel })
            .populate({
                path: 'cliente', model: ClienteModel, select: '_id pessoaFisica',
                populate: {
                    path: 'pessoaFisica', select: 'cpf dataNascimento pessoa -_id',
                    populate: {
                        path: 'pessoa', select: 'nome email telefone -_id'
                    }
                }
            })
            .populate({
                path: 'vendedor', model: ColaboradorModel, select: '_id codigo pessoaFisica',
                populate: {
                    path: 'pessoaFisica', select: 'pessoa -_id',
                    populate: {
                        path: 'pessoa', select: 'nome email telefone -_id'
                    }
                }
            });
    }

    async findOne(query: any) {
        return await VendaModel.findOne(query)
            .populate({ path: 'contrato', model: ContratoModel, select: '-venda' })
            .populate({ path: 'plano', model: PlanoModel })
            .populate({
                path: 'cliente', model: ClienteModel, select: '_id pessoaFisica',
                populate: {
                    path: 'pessoaFisica', select: 'cpf dataNascimento pessoa -_id',
                    populate: {
                        path: 'pessoa', select: 'nome email telefone -_id'
                    }
                }
            })
            .populate({
                path: 'vendedor', model: ColaboradorModel, select: '_id codigo pessoaFisica',
                populate: {
                    path: 'pessoaFisica', select: 'pessoa -_id',
                    populate: {
                        path: 'pessoa', select: 'nome email telefone -_id'
                    }
                }
            });
    }

    async findById(id: string) {
        return await VendaModel.findById(id)
            .populate({ path: 'contrato', model: ContratoModel, select: '-venda' })
            .populate({ path: 'plano', model: PlanoModel })
            .populate({
                path: 'cliente', model: ClienteModel, select: '_id pessoaFisica',
                populate: {
                    path: 'pessoaFisica', select: 'cpf dataNascimento pessoa -_id',
                    populate: {
                        path: 'pessoa', select: 'nome email telefone -_id'
                    }
                }
            })
            .populate({
                path: 'vendedor', model: ColaboradorModel, select: '_id codigo pessoaFisica',
                populate: {
                    path: 'pessoaFisica', select: 'pessoa -_id',
                    populate: {
                        path: 'pessoa', select: 'nome email telefone -_id'
                    }
                }
            });
    }
}