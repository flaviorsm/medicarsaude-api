import { UsuarioDTO } from './../dtos/UsuarioDTO';
import { IUsuario } from "../interfaces/IUsuario";
import { UsuarioModel } from '../models/Usuario.model';
import { RepositoryBase } from '../../core/RepositoryBase';

export class UsuarioRepository extends RepositoryBase<IUsuario, UsuarioDTO> {

    constructor() {
        super(UsuarioModel)
    }

    obterSenhaRegraPorUsuario(nome: string) {
        return UsuarioModel.findOne({ usuario: nome }, { _id: true, regra: true, senha: true });
    }

    obterSenhaRegraPorId(id: string) {
        return UsuarioModel.findById(id, { _id: true, regra: true, senha: true });
    }

    async find(query: any = {}) {
        return await UsuarioModel.find(query).populate({
            path: 'pessoaFisica',
            populate: {
                path: 'pessoa'
            }
        });
    }

    async findOne(query: any) {
        return await UsuarioModel.findOne(query).populate({
            path: 'pessoaFisica',
            populate: {
                path: 'pessoa'
            }
        });
    }

    async findById(id: string) {
        return await UsuarioModel.findById(id).populate({
            path: 'pessoaFisica',
            populate: {
                path: 'pessoa'
            }
        });
    }

}