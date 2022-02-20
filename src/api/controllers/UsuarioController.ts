import { ControllerBase } from "../../core/ControllerBase";
import { UsuarioDTO } from "../dtos/UsuarioDTO";
import { IUsuario } from "../interfaces/IUsuario";
import { UsuarioService } from "../services/UsuarioService";

export class UsuarioController extends ControllerBase<IUsuario, UsuarioDTO, UsuarioService> {

    constructor() {
        super(UsuarioService);
    }
}