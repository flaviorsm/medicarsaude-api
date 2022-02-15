
import { ServiceBase } from "../../core/ServiceBase";
import { UsuarioDTO } from "../dtos/UsuarioDTO";
import { IUsuario } from "../interfaces/IUsuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import bcrypt = require('bcryptjs');

export class UsuarioService extends ServiceBase<IUsuario, UsuarioDTO, UsuarioRepository> {

    constructor() {
        super(UsuarioRepository);
    }

    async create(dto: UsuarioDTO): Promise<IUsuario> {
        try {
            dto.senha = await bcrypt.hash(dto.senha, 10);
            return await this.repository.create(dto);
        } catch (error) {
            this.logger.error(`Erro: ${error.message}`)
        }
    }

}