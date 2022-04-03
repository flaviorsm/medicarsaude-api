import { StatusEnum } from './../../shared/enum/Status.enum';
import { ClienteDTO } from './../dtos/ClienteDTO';
import * as jwt from 'jsonwebtoken';
import { ServiceBase } from "../../core/ServiceBase";
import APIException from "../../shared/utils/exceptions/APIException";
import HttpException from "../../shared/utils/exceptions/HttpException";
import { UsuarioDTO } from "../dtos/UsuarioDTO";
import { IUsuario } from "../interfaces/IUsuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { PessoaDTO } from './../dtos/PessoaDTO';
import { PessoaFisicaDTO } from './../dtos/PessoaFisicaDTO';
import bcrypt = require('bcryptjs');
import { RegraEnum } from '../../shared/enum/TipoUsuarioEnum';
import { ClienteRepository } from './../repositories/ClienteRepository';
import { Util } from '../../shared/utils/util';

require('dotenv').config()

export class UsuarioService extends ServiceBase<IUsuario, UsuarioDTO, UsuarioRepository> {

    private clienteRepository: ClienteRepository;

    constructor() {
        super(UsuarioRepository);
        this.clienteRepository = new ClienteRepository();
    }

    entityToDTO(entity: IUsuario): UsuarioDTO {
        return {
            id: entity._id,
            usuario: entity.usuario,
            cpf: entity.pessoaFisica.cpf,
            dataNascimento: entity.pessoaFisica.dataNascimento,
            nome: entity.pessoaFisica.pessoa.nome,
            email: entity.pessoaFisica.pessoa.email,
            telefone: entity.pessoaFisica.pessoa.telefone,
            regra: entity.regra,
            status: entity.status,
        };
    }

    async create(dto: UsuarioDTO): Promise<IUsuario> {
        let usuario = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();
            const pessoaFisica = await this.pessoaFisicaRepository.findOne({ cpf: dto.cpf });
            if (!pessoaFisica) {
                const pessoaDto: PessoaDTO = { nome: dto.nome, email: dto.email, telefone: dto.telefone };
                dto.pessoa = await this.pessoaRepository.create(pessoaDto, session).then(ps => ps._id);

                const pessoaFisicaDto: PessoaFisicaDTO = { cpf: dto.cpf, dataNascimento: dto.dataNascimento, pessoa: dto.pessoa };
                dto.pessoaFisica = await this.pessoaFisicaRepository.create(pessoaFisicaDto, session).then(pf => pf._id);
            } else {
                dto.pessoaFisica = pessoaFisica._id;
            }
            dto.senha = await bcrypt.hash(dto.senha, 10);
            usuario = await super.create(dto, session);
            this.logger.info('dto ===>', dto.regra === RegraEnum.CLIENTE);
            if(dto.regra === RegraEnum.CLIENTE) {
                const cliente: any = {
                    codigo: Util.codigoAleatorio(),
                    status: StatusEnum.ATIVO,
                    pessoaFisica: dto.pessoaFisica,
                };
                await this.clienteRepository.create(cliente, session).then(cli => cli);
            }

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

    async update(id: string, dto: UsuarioDTO): Promise<IUsuario> {

        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            dto.senha = await bcrypt.hash(dto.senha, 10);

            const usuario = await this.repository.update(id, dto, session).then(usu => {
                if (usu) {
                    return usu;
                }
                throw new HttpException(404, `Colaborador ${dto.nome} não encontrado`);
            })

            const pessoaFisica = await this.pessoaFisicaRepository.update(usuario.pessoaFisica.toString(), dto, session)
                .then(pf => pf);

            await this.pessoaRepository.update(pessoaFisica.pessoa.toString(), dto, session).then(pes => pes);

            await session.commitTransaction();


        } catch (error) {
            await session.abortTransaction();
            throw new APIException(error);
        }

        session.endSession();
        return await this.findById(id);
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
            return { userId: usuario._id, username: nomeUsuario, role: usuario.regra, token };

        } catch (error) {
            throw new APIException(error);
        }
    }

    private verificaSenhaEhValida(sehnaDescriptografada: string, senhaCriptografada: string) {
        return bcrypt.compareSync(sehnaDescriptografada, senhaCriptografada);
    }
}