import { PessoaFisicaModel } from '../models/PessoaFisica.model';
import { connect } from './../../config/db.config';

export class PessoaFisicaRepository {

    constructor() {
        connect()
    }

    async getAll() {
        return await PessoaFisicaModel.find({});
    }

    async getById(id: string) {
        return await PessoaFisicaModel.findById(id);
    }

    async create(entity: any, session: any) {
        return await PessoaFisicaModel.create([entity], { session });
    }

    async update(entity: any, session: any) {
        return await PessoaFisicaModel.updateOne([entity], { session });
    }

    async delete(id: string, session: any) {
        await PessoaFisicaModel.deleteOne({ _id: id }, session);
    }


}