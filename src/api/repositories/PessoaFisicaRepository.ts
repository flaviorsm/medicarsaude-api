import { PessoaFisicaModel } from '../models/PessoaFisica.model';

export class PessoaFisicaRepository {

    async find(query: any) {
        return await PessoaFisicaModel.find(query).populate('pessoa');
    }

    async findOne(query: any) {
        return await PessoaFisicaModel.findOne(query);
    }

    async findById(id: string) {
        return await PessoaFisicaModel.findById(id);
    }

    async create(entity: any, session: any) {
        return await PessoaFisicaModel.create([entity], { session });
    }

    async update(id: string, entity: any, session: any) {
        return await PessoaFisicaModel.findByIdAndUpdate(id, entity, { session });
    }

    delete(id: string, session: any) {
        PessoaFisicaModel.deleteOne({ _id: id }, session);
    }

}