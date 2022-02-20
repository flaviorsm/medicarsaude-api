import { ServiceBase } from "../../core/ServiceBase";
import { UsuarioDTO } from "../dtos/UsuarioDTO";
import { IUsuario } from "../interfaces/IUsuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { PessoaFisicaDTO } from './../dtos/PessoaFisicaDTO';
import * as jwt from 'jsonwebtoken';
import bcrypt = require('bcryptjs');
import HttpException from "../../shared/utils/exceptions/HttpException";
import APIException from "../../shared/utils/exceptions/APIException";

require('dotenv').config()

export class UsuarioService extends ServiceBase<IUsuario, UsuarioDTO, UsuarioRepository> {

    constructor() {
        super(UsuarioRepository);
    }

    async create(dto: UsuarioDTO): Promise<IUsuario> {

        let usuario = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();
            dto.pessoa = await this.pessoaRepository.create(dto, session).then(ps => ps._id);
            dto.pessoaFisica = await this.pessoaFisicaRepository.create(dto, session).then(pf => pf._id);
            dto.senha = await bcrypt.hash(dto.senha, 10);
            usuario = await super.create(dto, session);
            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`Erro ao cria usuário:`, error);
            throw new APIException(error);
        }

        session.endSession();

        if (usuario) {
            return await super.findById(usuario._id);
        }

        return usuario;
    }

    async login(nomeUsuario: string, senha: string) {
        try {
            const usuario = await this.repository.obterSenhaRegraPorUsuario(nomeUsuario);

            if (!usuario) {
                throw new HttpException(404, 'Usuário não encontrado.');
            }

            if (!this.verificaSenhaEhValida(senha, usuario.senha)) {
                throw new HttpException(400, 'Senha inválida!');
            }

            const token = jwt.sign(
                { userId: usuario._id, username: nomeUsuario, role: usuario.regra },
                process.env.jwtSecret,
                { expiresIn: '1h' }
            );
            return token;

        } catch (error) {
            throw new APIException(error);
        }
    }

    private verificaSenhaEhValida(sehnaDescriptografada: string, senhaCriptografada: string) {
        return bcrypt.compareSync(sehnaDescriptografada, senhaCriptografada);
    }


}