import { PessoaJuridicaDTO } from '../dtos/PessoaJuridicaDTO';
import { IPessoaJuridica } from '../interfaces/IPessoaJuridica';
import { PessoaJuridicaModel } from '../models/PessoaJuridica.model';
import { RepositoryBase } from '../../core/RepositoryBase';

export class PessoaJuridicaRepository extends RepositoryBase<IPessoaJuridica, PessoaJuridicaDTO> {

    constructor() {
        super(PessoaJuridicaModel);
    }

    async find(query: any): Promise<IPessoaJuridica[]> {
        return await PessoaJuridicaModel
            .find(query)
            .populate({
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            });
    }

    async findOne(query: any): Promise<IPessoaJuridica> {
        return await PessoaJuridicaModel
            .findOne(query)
            .populate({
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            });
    }

    async findById(id: string): Promise<IPessoaJuridica> {
        return await PessoaJuridicaModel
            .findById(id)
            .populate({
                path: 'pessoa',
                populate: {
                    path: 'endereco'
                }
            });
    }
}