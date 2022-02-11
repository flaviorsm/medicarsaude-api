import { ClienteModel } from './../models/Cliente.model';
import { ICliente } from './../interfaces/ICliente';
import { RepositoryBase } from '../core/RepositoryBase';
import { ClienteDTO } from '../dtos/ClienteDTO';

export class ClienteRepository extends RepositoryBase<ICliente, ClienteDTO> {

    constructor() {
        super(ClienteModel);
    }

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
}
