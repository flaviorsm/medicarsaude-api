import { ClienteModel } from './../models/Cliente.model';
import { ICliente } from './../interfaces/ICliente';
import { RepositoryBase } from '../../core/RepositoryBase';
import { ClienteDTO } from '../dtos/ClienteDTO';

export class ClienteRepository extends RepositoryBase<ICliente, ClienteDTO> {

    constructor() {
        super(ClienteModel);
    }

    async find(query: any = {}) {
        return await ClienteModel.find(query).populate({
            path: 'pessoaFisica',
            populate: {
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            }
        });
    }

    async findOne(query: any) {
        return await ClienteModel.findOne(query).populate({
            path: 'pessoaFisica',
            populate: {
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            }
        });
    }

    async findById(id: string) {
        return await ClienteModel.findById(id).populate({
            path: 'pessoaFisica',
            populate: {
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            }
        });
    }

    async recordsByMonth() {
        const monthsArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        return ClienteModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
                        $lt: new Date(new Date().setHours(24))
                    },
                    status: 0
                }
            },
            {
                $group: {
                    _id: { 'year_month': { $substrCP: ["$createdAt", 0, 7] } },
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
        return await ClienteModel.aggregate([
            {
                $group: {
                    _id: { status: '$status' },
                    count: { $sum: 1 }
                }
            }
        ]);
    }
}
