import { PessoaModel } from "../models/Pessoa.model";
import { connect } from './../../config/db.config';

export class PessoaRepository {
    constructor() {
        connect()
    }

    async getAll() {
        return await PessoaModel.find({});
    }

    async getById(id: string) {
        return await PessoaModel.findById(id);
    }

    async create(entity: any, session: any) {
        return await PessoaModel.create([entity], { session });
    }

    async update(entity: any, session: any) {
        return await PessoaModel.updateOne([entity], { session });
    }

    async delete(id: string, session: any) {
        await PessoaModel.deleteOne({ _id: id }, session);
    }
}