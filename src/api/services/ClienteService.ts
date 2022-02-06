import { ICliente } from './../interfaces/ICliente';
import { query } from 'express';
import { ParsedQs } from 'qs';
import { Database } from '../../config/db.config';
import { Logger } from '../../logger/logger';
import { ClienteDTO } from '../dto/ClienteDTO';
import { ClienteRepository } from "../repository/ClienteRepository";
import { PessoaFisicaRepository } from '../repository/PessoaFisicaRepository';
import { PessoaRepository } from '../repository/PessoaRepository';

export class ClienteService {

    private logger: Logger;
    private clienteRepository: ClienteRepository;
    private pessoaRepository: PessoaRepository;
    private pessoaFisicaRepository: PessoaFisicaRepository;

    private database: Database;

    constructor() {
        this.clienteRepository = new ClienteRepository();
        this.pessoaRepository = new PessoaRepository();
        this.pessoaFisicaRepository = new PessoaFisicaRepository();
        this.logger = new Logger();
        this.database = new Database();
    }

    async find(query: any = {}) {
        this.logger.info('Query', query);
        if (query.nome || query.email || query.telefone) {
            let clientes = [];
            const pessoa = await this.pessoaRepository.find(query);
            for (const ps of pessoa) {
                const pf = await this.pessoaFisicaRepository.findOne({ pessoa: ps._id });
                const cl = await this.clienteRepository.findOne({ pessoaFisica: pf._id });
                clientes.push(cl as ICliente);
            }
            return clientes;
        }

        else if (query.cpf) {
            const pessoaFisica = await this.pessoaFisicaRepository.findOne(query);
            return await this.clienteRepository.findOne({ pessoaFisica: pessoaFisica._id });
        }

        else if (query.codigo) {
            return await this.clienteRepository.findOne(query);
        }

        else {
            return await this.clienteRepository.find();
        }

    }

    async findById(id: string) {
        return await this.clienteRepository.findById(id);
    }

    async create(dto: ClienteDTO) {

        let cliente = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            dto.pessoa = await this.pessoaRepository.create(dto, session).then(ps => ps[0]._id);

            dto.pessoaFisica = await this.pessoaFisicaRepository.create(dto, session).then(pf => pf[0]._id);

            cliente = await this.clienteRepository.create(dto, session).then(cli => cli[0]);

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            throw new Error(error);
        }

        session.endSession();

        if (cliente) {
            return await this.clienteRepository.findById(cliente._id).then(cli => cli);
        }

        return cliente;
    }

    async update(id: string, clienteDTO: ClienteDTO) {
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            const cliente = await this.clienteRepository.update(id, clienteDTO, session).then(cli => {
                if (cli) {
                    return cli;
                }
                throw new Error(`Cliente ${clienteDTO.nome} não encontrado`);
            }).catch(err => {
                throw new Error(`Erro ao alterar Cliente: ${err}`);
            });

            const pessoaFisica = await this.pessoaFisicaRepository.update(cliente.pessoaFisica.toString(), clienteDTO, session).then(pf => pf)
                .catch(err => {
                    throw new Error(`Erro ao alterar Pessoa Fisica: ${err}`);
                });

            await this.pessoaRepository.update(pessoaFisica.pessoa.toString(), clienteDTO, session).then(pes => pes)
                .catch(err => {
                    throw new Error(`Erro ao alterar Pessoa: ${err}`);
                });

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            throw new Error(error);
        }

        session.endSession();
        return clienteDTO;
    }

    async updateStatus(id: string, body: any) {
        this.logger.info('===>', body)
        return await this.clienteRepository.update(id, body)
    }

    async delete(id: string) {
        const session = await this.database.conn.startSession();
        try {
            session.startTransaction();

            const cliente = await this.clienteRepository.findById(id);

            await this.pessoaRepository.delete(cliente.pessoaFisica.pessoa._id, session);

            await this.pessoaFisicaRepository.delete(cliente.pessoaFisica._id, session);
            
            await this.clienteRepository.delete(id, session);
            
            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            throw new Error(error);
        }

        session.endSession();
    }

}