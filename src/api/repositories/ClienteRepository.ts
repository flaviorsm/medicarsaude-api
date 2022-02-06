import { ClienteModel } from '../models/Cliente.model';

export class ClienteRepository {

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

    async create(entity: any, session: any) {
        return await ClienteModel.create([entity], { session });
    }

    async update(id: string, entity: any, session: any = null) {
        return await ClienteModel.findByIdAndUpdate(id, entity, { session });
    }
}
