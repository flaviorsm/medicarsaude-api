import { ClienteDTO } from '../dtos/ClienteDTO';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { ICliente } from './../interfaces/ICliente';
import { ServiceBase } from '../../core/ServiceBase';
import APIException from '../../shared/utils/exceptions/APIException';
import HttpException from '../../shared/utils/exceptions/HttpException';

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

            const pessoaFisica = await this.pessoaFisicaRepository.findOne({ cpf: dto.cpf });
            if (!pessoaFisica) {
                dto.pessoa = await this.pessoaRepository.create(dto, session).then(ps => ps._id);
                dto.pessoaFisica = await this.pessoaFisicaRepository.create(dto, session).then(pf => pf._id);
            } else {
                dto.pessoaFisica = pessoaFisica._id;
            }

            cliente = await this.repository.create(dto, session).then(cli => cli);

            await session.commitTransaction();

            session.endSession();

            if (cliente) {
                return await super.findById(cliente._id).then(cli => cli);
            }

            return cliente;

        } catch (error) {
            this.logger.info('Error ==> ', error);
            await session.abortTransaction();
            throw new APIException(error);
        }

    }

    async update(id: string, dto: ClienteDTO): Promise<ICliente> {
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            const cliente = await this.repository.update(id, dto, session)
                .then(res => {
                    if (!res) {
                        throw new HttpException(404, `Cliente ${dto.nome} não encontrado`);
                    }
                    return res;
                });
            const pessoaFisica = await this.pessoaFisicaRepository.update(cliente.pessoaFisica.toString(), dto, session)
                .then(res => {
                    if (!res) {
                        throw new HttpException(404, `Pessoa Fisica ${dto.nome} não encontrado`);
                    }
                    return res;
                });
            const pessoa = await this.pessoaRepository.update(pessoaFisica.pessoa.toString(), dto, session)
                .then(res => {
                    if (!res) {
                        throw new HttpException(404, `Pessoa ${dto.nome} não encontrado`);
                    }
                    return res;
                });

            await this.enderecoRepository.update(pessoa.endereco.toString(), dto, session)
                .then(res => {
                    if (!res) {
                        throw new HttpException(404, `Endereço de ${dto.nome} não encontrado`);
                    }
                    return res;
                });

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            throw new APIException(error);
        }

        session.endSession();
        return await this.findById(id);
    }

}