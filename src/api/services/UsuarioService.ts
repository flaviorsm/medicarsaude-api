import { ServiceBase } from "../../core/ServiceBase";
import { UsuarioDTO } from "../dtos/UsuarioDTO";
import { IUsuario } from "../interfaces/IUsuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { PessoaFisicaDTO } from './../dtos/PessoaFisicaDTO';
import * as jwt from 'jsonwebtoken';
import bcrypt = require('bcryptjs');

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
            dto.pessoa = { nome: dto.nome, email: dto.email, telefone: dto.telefone };
            const pessoaId = await this.pessoaRepository.create(dto.pessoa, session).then(ps => ps._id);
            const pessoaFisica = { cpf: dto.cpf, pessoa: pessoaId, dataNascimento: dto.dataNascimento } as PessoaFisicaDTO;
            dto.pessoaFisica = await this.pessoaFisicaRepository.create(pessoaFisica, session).then(pf => pf._id);
            dto.senha = await bcrypt.hash(dto.senha, 10);
            usuario = await super.create(dto, session);
            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`Erro ao cria usuário: ${error.message}`);
            throw new Error(error);
        }

        session.endSession();

        if (usuario) {
            return await super.findById(usuario._id).then(cli => cli);
        }

        return usuario;
    }

    async login(email: string, senha: string) {
        try {
            const pessoa = await this.pessoaRepository.findOne({ email });
            if (!pessoa) {
                return { autenticado: false, mensagem: 'Usuário não encontrado.' };
            }
            const pessoaFisica = await this.pessoaFisicaRepository.findOne({ pessoa: pessoa._id });
            const usuario = await this.repository.findOne({ pessoaFisica: pessoaFisica._id });

            const senhaUsuario = (await this.repository.obterSenhaRegra(usuario._id)).senha;

            if (!this.verificaSenhaEhValida(senha, senhaUsuario)) {
                return { autenticado: false, mensagem: 'Senha inválida!.' };
            }
            const token = jwt.sign(
                { userId: usuario._id, username: pessoa.nome },
                process.env.jwtSecret,
                { expiresIn: '1h' }
            );
            return { autenticado: true, token };

        } catch (error) {
            this.logger.error(`Erro ao logar: ${error.message}`);
            throw new Error(error);
        }
    }

    private verificaSenhaEhValida(sehnaDescriptografada: string, senhaCriptografada: string) {
        return bcrypt.compareSync(sehnaDescriptografada, senhaCriptografada);
    }


}