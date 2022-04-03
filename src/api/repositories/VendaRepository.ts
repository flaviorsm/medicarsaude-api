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

    async recordsByMonth() {
        const monthsArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        return VendaModel.aggregate([
            {
                $match: {
                    dataVenda: {
                        $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
                        $lt: new Date(new Date().setHours(24))
                    }
                }
            },
            {
                $group: {
                    _id: { 'year_month': { $substrCP: ["$dataVenda", 0, 7] } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year_month": 1 }
            },
            {
                $project: {
                    _id: 0,
                    count: 1,
                    month_year: {
                        $concat: [
                            { $arrayElemAt: [monthsArray, { $subtract: [{ $toInt: { $substrCP: ["$_id.year_month", 5, 2] } }, 1] }] },
                            "-",
                            { $substrCP: ["$_id.year_month", 0, 4] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    data: { $push: { k: "$month_year", v: "$count" } }
                }
            },
            {
                $project: {
                    data: { $arrayToObject: "$data" },
                    _id: 0
                }
            }
        ]);
    }

    async recordsByStatus() {
        return await VendaModel.aggregate([
            {
                $group: {
                    _id: { status: '$statusPagamento' },
                    count: { $sum: 1 }
                }
            }
        ]);
    }
}