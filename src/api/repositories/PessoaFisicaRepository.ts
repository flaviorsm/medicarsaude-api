import { PessoaFisicaDTO } from './../dtos/PessoaFisicaDTO';
import { IPessoaFisica } from './../interfaces/IPessoaFisica';
import { PessoaFisicaModel } from '../models/PessoaFisica.model';
import { RepositoryBase } from '../../core/RepositoryBase';

export class PessoaFisicaRepository extends RepositoryBase<IPessoaFisica, PessoaFisicaDTO> {

    constructor() {
        super(PessoaFisicaModel);
    }

    async find(query: any): Promise<IPessoaFisica | IPessoaFisica[]> {
        return await PessoaFisicaModel
            .find(query)
            .populate({
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            });
    }

    async findOne(query: any): Promise<IPessoaFisica> {
        return await PessoaFisicaModel
            .findOne(query)
            .populate({
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            });
    }

    async findById(id: string): Promise<IPessoaFisica> {
        return await PessoaFisicaModel
            .findById(id)
            .populate({
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            });
    }
}