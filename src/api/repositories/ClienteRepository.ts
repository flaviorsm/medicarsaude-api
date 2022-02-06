import { ParsedQs } from 'qs';
import { ICliente } from '../interfaces/ICliente';
import { ClienteModel } from '../models/Cliente.model';

export class ClienteRepository {

    async find(query: any = {}) {
        return await ClienteModel.find(query).populate({
            path: 'pessoaFisica',
            populate: {
                path: 'pessoa'
            }
        });
    }

    async findOne(query: any) {
        return await ClienteModel.findOne(query).populate({
            path: 'pessoaFisica',
            populate: {
                path: 'pessoa'
            }
        });
    }

    async findById(id: string) {
        return await ClienteModel.findById(id).populate({
            path: 'pessoaFisica',
            populate: {
                path: 'pessoa'
            }
        });
    }

    async create(entity: any, session: any) {
        return await ClienteModel.create([entity], { session });
    }

    async update(id: string, entity: any, session: any = null) {
        return await ClienteModel.findByIdAndUpdate(id, entity, { session });
    }

    async delete(id: string, session: any) {
        await ClienteModel.deleteOne({ _id: id }, session);
    }


}
