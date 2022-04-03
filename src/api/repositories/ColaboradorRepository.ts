import { ColaboradorDTO } from './../dtos/ColaboradorDTO';
import { ColaboradorModel } from '../models/Colaborador.model';
import { IColaborador } from './../interfaces/IColaborador';
import { RepositoryBase } from '../../core/RepositoryBase';

export class ColaboradorRepository extends RepositoryBase<IColaborador, ColaboradorDTO> {

    constructor() {
        super(ColaboradorModel)
    }

    async find(query: any): Promise<(IColaborador & { _id: any; })[]> {
        return await ColaboradorModel
            .find(query)
            .populate({
                path: 'pessoaFisica',
                populate: {
                    path: 'pessoa',
                    populate: {
                        path: 'endereco'
                    }
                }
            });
    }

    async findById(id: string): Promise<IColaborador & { _id: any; }> {
        return await ColaboradorModel
            .findById(id)
            .populate({
                path: 'pessoaFisica',
                populate: {
                    path: 'pessoa',
                    populate: {
                        path: 'endereco'
                    }
                }
            });
    }

    async findOne(query: any): Promise<IColaborador & { _id: any; }> {
        return await ColaboradorModel
            .findOne(query)
            .populate({
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