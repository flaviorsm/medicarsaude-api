import { IParceiro } from "../interfaces/IParceito";
import { ParceiroModel } from "../models/Parceiro.model";
import { Repository } from "../../shared/utils/Repository";

export class ParceiroRepository implements Repository<IParceiro> {

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