import { IParceiro } from "../interfaces/IParceito";
import { ParceiroModel } from "../models/Parceiro.model";
import { RepositoryBase } from "../../shared/utils/RepositoryBase";

export class ParceiroRepository extends RepositoryBase<IParceiro> {

    async find(query: any): Promise<(IParceiro & { _id: string; })[]> {
        return await ParceiroModel.find(query)
            .populate({
                path: 'pessoaFisica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            })
            .populate({
                path: 'pessoaJuridica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            });
    }

    async findOne(query: any): Promise<IParceiro & { _id: string; }> {
        return await ParceiroModel.findOne(query)
            .populate({
                path: 'pessoaFisica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            })
            .populate({
                path: 'pessoaJuridica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            });
    }

    async findById(id: string): Promise<IParceiro & { _id: string; }> {
        return await ParceiroModel.findById(id)
            .populate({
                path: 'pessoaFisica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            })
            .populate({
                path: 'pessoaJuridica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            });
    }

    async create(entity: any, session: any): Promise<(IParceiro & { _id: string; })[]> {
        return await ParceiroModel.create([entity], { session });
    }

    async update(id: string, entity: any, session?: any): Promise<IParceiro & { _id: string; }> {
        return await ParceiroModel.findByIdAndUpdate(id, entity, { session });
    }

}