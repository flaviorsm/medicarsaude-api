import { IPessoaJuridica } from "../interfaces/IPessoaJuridica";
import { PessoaJuridicaModel } from "../models/PessoaJuridica.model";
import { Repository } from "../../shared/utils/Repository";

export class PessoaJuridicaRepository implements Repository<IPessoaJuridica> {

    async find(query: any): Promise<(IPessoaJuridica & { _id: string; })[]> {
        return await PessoaJuridicaModel.find(query)
            .populate({
                path: 'Pessoa',
                populate: {
                    path: 'Endereco'
                }
            });
    }

    async findOne(query: any): Promise<IPessoaJuridica & { _id: string; }> {
        return await PessoaJuridicaModel.findOne(query)
            .populate({
                path: 'Pessoa',
                populate: {
                    path: 'Endereco'
                }
            });
    }

    async findById(id: string): Promise<IPessoaJuridica & { _id: string; }> {
        return await PessoaJuridicaModel.findById(id)
            .populate({
                path: 'Pessoa',
                populate: {
                    path: 'Endereco'
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