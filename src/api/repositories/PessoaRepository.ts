import { PessoaModel } from "../models/Pessoa.model";

export class PessoaRepository {

    async find(query: any) {
        return await PessoaModel.find(query);
    }

    async findOne(query: any) {
        return await PessoaModel.findOne(query);
    }

    async findById(id: string) {
        return await PessoaModel.findById(id);
    }

    async create(entity: any, session: any) {
        return await PessoaModel.create([entity], { session });
    }

    async update(id: string, entity: any, session: any) {
        return await PessoaModel.findByIdAndUpdate(id, entity, { session });
    }

    delete(id: string, session: any) {
        PessoaModel.deleteOne({ _id: id }, session);
    }
}