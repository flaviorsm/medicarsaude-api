import { PessoaFisicaDTO } from './../dtos/PessoaFisicaDTO';
import { PessoaDTO } from './../dtos/PessoaDTO';

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
        let usuario = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();
            this.logger.info('===> session ok');

            const pessoa = { nome: dto.nome, email: dto.email, telefone: dto.telefone } as PessoaDTO;
            this.logger.info('===> pessoa', pessoa);
            const pessoaId = await this.pessoaRepository.create(pessoa, session).then(ps => ps._id);
            this.logger.info(pessoaId);
            const pessoaFisica = { cpf: dto.cpf, pessoa: pessoaId } as PessoaFisicaDTO;

            dto.pessoaFisica = await this.pessoaFisicaRepository.create(pessoaFisica, session).then(pf => pf._id);
            this.logger.info(dto.pessoaFisica);

            dto.senha = await bcrypt.hash(dto.senha, 10);
            this.logger.info('===>', dto);
            usuario = await super.create(dto, session);

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`Erro: ${error.message}`);
            throw new Error(error);
        }

        session.endSession();

        if (usuario) {
            return await super.findById(usuario._id).then(cli => cli);
        }

        return usuario;
    }



}