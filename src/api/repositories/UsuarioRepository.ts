import { UsuarioDTO } from './../dtos/UsuarioDTO';
import { IUsuario } from "../interfaces/IUsuario";
import { UsuarioModel } from '../models/Usuario.model';
import { RepositoryBase } from '../../core/RepositoryBase';

export class UsuarioRepository extends RepositoryBase<IUsuario, UsuarioDTO> {

    constructor() {
        super(UsuarioModel)
    }

    obterSenhaRegra(id: string) {
        return UsuarioModel.findById(id, { regra: true, senha: true });
    }
}