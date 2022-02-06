import { IPessoaJuridica } from "../interfaces/IPessoaJuridica";
import { PessoaJuridicaModel } from "../models/PessoaJuridica.model";
import { RepositoryBase } from "../../shared/utils/RepositoryBase";

export class PessoaJuridicaRepository extends RepositoryBase<IPessoaJuridica> {

    constructor() {
        super();
    }

    async find(query: any): Promise<(IPessoaJuridica & { _id: string; })[]> {
        return await PessoaJuridicaModel.find(query)
            .populate({
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            });
    }

    async findOne(query: any): Promise<IPessoaJuridica & { _id: string; }> {
        return await PessoaJuridicaModel.findOne(query)
            .populate({
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            });
    }

    async findById(id: string): Promise<IPessoaJuridica & { _id: string; }> {
        return await PessoaJuridicaModel.findById(id)
            .populate({
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            });
    }

    async create(entity: any, session: any): Promise<(IPessoaJuridica & { _id: string; })[]> {
        return await PessoaJuridicaModel.create([entity], { session });
    }

    async update(id: string, entity: any, session: any): Promise<IPessoaJuridica & { _id: string; }> {
        return await PessoaJuridicaModel.findByIdAndUpdate(id, entity, { session });
    }

    delete(id: string, session: any): void {
        PessoaJuridicaModel.deleteOne({ _id: id }, session);
    }
}