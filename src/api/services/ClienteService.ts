import { ClienteDTO } from '../dtos/ClienteDTO';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { ICliente } from './../interfaces/ICliente';
import { ServiceBase } from '../core/ServiceBase';

export class ClienteService extends ServiceBase<ICliente, ClienteDTO, ClienteRepository> {

    constructor() {
        super(ClienteRepository);
    }

    async create(dto: ClienteDTO): Promise<ICliente> {
        let cliente = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            dto.endereco = await this.enderecoRepository.create(dto, session).then(ed => ed._id);

            dto.pessoa = await this.pessoaRepository.create(dto, session).then(ps => ps._id);

            dto.pessoaFisica = await this.pessoaFisicaRepository.create(dto, session).then(pf => pf._id);

            cliente = await super.create(dto, session).then(cli => cli);

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            throw new Error(error);
        }

        session.endSession();

        if (cliente) {
            return await super.findById(cliente._id).then(cli => cli);
        }

        return cliente;
    }

    async update(id: string, dto: ClienteDTO): Promise<ICliente> {
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            const cliente = await super.update(id, dto, session).then(cli => {
                if (cli) {
                    return cli;
                }
                throw new Error(`Cliente ${dto.nome} não encontrado`);
            }).catch(err => {
                throw new Error(`Erro ao alterar Cliente: ${err}`);
            });

            const pessoaFisica = await this.pessoaFisicaRepository.update(cliente.pessoaFisica.toString(), dto, session).then(pf => pf)
                .catch(err => {
                    throw new Error(`Erro ao alterar Pessoa Fisica: ${err}`);
                });

            const pessoa = await this.pessoaRepository.update(pessoaFisica.pessoa.toString(), dto, session).then(pes => pes)
                .catch(err => {
                    throw new Error(`Erro ao alterar Pessoa: ${err}`);
                });

            await this.enderecoRepository.update(pessoa.endereco.toString(), dto, session).then(end => end)
                .catch(err => {
                    throw new Error(`Erro ao alterar Endereço: ${err}`);
                });

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            throw new Error(error);
        }

        session.endSession();
        return await this.findById(id).then(res => res);
    }

}