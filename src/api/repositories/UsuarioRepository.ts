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
}