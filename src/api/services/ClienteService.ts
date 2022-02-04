import database from '../../config/db.config';
import { Logger } from '../../logger/logger';
import { ClienteDTO } from '../dto/ClienteDTO';
import { Cliente } from '../interfaces/Cliente';
import { ClienteRepository } from "../repository/ClienteRepository";
import { PessoaFisicaRepository } from '../repository/PessoaFisicaRepository';
import { PessoaRepository } from '../repository/PessoaRepository';

export class ClienteService {

    private logger: Logger;
    private clienteRepository: ClienteRepository;
    private pessoaRepository: PessoaRepository;
    private pessoaFisicaRepository: PessoaFisicaRepository;

    constructor() {
        this.clienteRepository = new ClienteRepository();
    }

    async getAll() {
        return await this.clienteRepository.getAll();
    }

    async getById(id: string) {
        return await this.clienteRepository.getById(id);
    }

    async create(dto: ClienteDTO) {

        let cliente = {};
        console.log(database);
        const session = await database.startSession();

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
        return cliente;

    }

    async update(entity: Cliente) {
        let cliente = null;
        const session = await database.startSession();

        try {
            session.startTransaction();

            cliente = await this.clienteRepository.update(entity, session);

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            throw new Error(error);
        }

        session.endSession();
        return cliente
    }

    async delete(id: string) {
        const session = await database.startSession();

        try {
            session.startTransaction();

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