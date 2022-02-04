import { connect } from '../../config/db.config';
import { ClienteModel } from '../models/Cliente.model';

export class ClienteRepository {

    constructor() {
        connect()
    }

    async getAll() {
        return await ClienteModel.find({});
    }

    async getById(id: string) {
        return await ClienteModel.findById(id);
    }

    async create(entity: any, session: any) {
        return await ClienteModel.create([entity], { session });
    }

    async update(entity: any, session: any) {
        return await ClienteModel.updateOne([entity], { session });
    }

    async delete(id: string, session: any) {
        await ClienteModel.deleteOne({ _id: id }, session);
    }
}
