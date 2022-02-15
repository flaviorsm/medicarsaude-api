import { UsuarioDTO } from './../dtos/UsuarioDTO';
import { IUsuario } from "../interfaces/IUsuario";
import { UsuarioModel } from '../models/Usuario.model';
import { RepositoryBase } from '../../core/RepositoryBase';

export class UsuarioRepository extends RepositoryBase<IUsuario, UsuarioDTO> {

    constructor() {
        super(UsuarioModel)
    }
}