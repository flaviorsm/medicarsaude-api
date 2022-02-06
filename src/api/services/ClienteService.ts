import { StatusEnum } from '../../shared/enum/Status.enum';
import { ServiceBase } from '../../shared/utils/ServiceBase';
import { ClienteDTO } from '../dtos/ClienteDTO';
import { ClienteRepository } from "../repositories/ClienteRepository";
import { ICliente } from './../interfaces/ICliente';

export class ClienteService extends ServiceBase<ICliente, ClienteDTO> {

    private clienteRepository: ClienteRepository;

    constructor() {
        super();
        this.clienteRepository = new ClienteRepository();
    }

    async find(query: any): Promise<ICliente | ICliente[]> {
        if (query.nome || query.email || query.telefone) {
            if (query.nome) {
                query = { nome: { "$regex": query.nome, "$options": "i" } };
            }
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

    async findById(id: string): Promise<ICliente & { _id: string; }> {
        return await this.clienteRepository.findById(id);
    }

    async create(dto: ClienteDTO): Promise<ICliente & { _id: string; }> {
        let cliente = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            dto.endereco = await this.enderecoRepository.create(dto, session).then(ed => ed[0]._id);

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

    async update(id: string, dto: ClienteDTO): Promise<ICliente & { _id: string; }> {
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            const cliente = await this.clienteRepository.update(id, dto, session).then(cli => {
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

    delete(id: string): Promise<ICliente & { _id: string; }> {
        return this.clienteRepository.update(id, { status: StatusEnum.INATIVO });
    }

    alterStatus(id: string, body: any): Promise<ICliente & { _id: string; }> {
        return this.clienteRepository.update(id, body);
    }

}