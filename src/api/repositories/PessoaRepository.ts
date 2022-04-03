import { RepositoryBase } from '../../core/RepositoryBase';
import { PessoaModel } from '../models/Pessoa.model';
import { PessoaDTO } from './../dtos/PessoaDTO';
import { IPessoa } from './../interfaces/IPessoa';

export class PessoaRepository extends RepositoryBase<IPessoa, PessoaDTO> {

    constructor() {
        super(PessoaModel);
    }

    async find(query: any) {
        return await PessoaModel.find(query).populate('endereco');
    }

    async findOne(query: any) {
        return await PessoaModel.findOne(query).populate('endereco');
    }

    async findById(id: string) {
        return await PessoaModel.findById(id).populate('endereco');
    }

}