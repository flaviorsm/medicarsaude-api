import { ServiceBase } from '../../core/ServiceBase';
import APIException from '../../shared/utils/exceptions/APIException';
import HttpException from '../../shared/utils/exceptions/HttpException';
import { ClienteDTO } from '../dtos/ClienteDTO';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { ICliente } from './../interfaces/ICliente';

export class ClienteService extends ServiceBase<ICliente, ClienteDTO, ClienteRepository> {

    constructor() {
        super(ClienteRepository);
    }

    entityToDTO(entity: ICliente): ClienteDTO {
        return {
            id: entity._id,
            codigo: entity.codigo,
            status: entity.status,

            cpf: entity.pessoaFisica.cpf,
            rg: entity.pessoaFisica.rg,
            dataNascimento: entity.pessoaFisica.dataNascimento,

            nome: entity.pessoaFisica.pessoa.nome,
            email: entity.pessoaFisica.pessoa.email,
            telefone: entity.pessoaFisica.pessoa.telefone,

            cep: entity.pessoaFisica.pessoa.endereco.cep,
            rua: entity.pessoaFisica.pessoa.endereco.rua,
            bairro: entity.pessoaFisica.pessoa.endereco.bairro,
            cidade: entity.pessoaFisica.pessoa.endereco.cidade,
            estado: entity.pessoaFisica.pessoa.endereco.estado,
        }
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
                        throw new HttpException(404, `Cliente ${dto.nome} n??o encontrado`);
                    }
                    return res;
                });
            const pessoaFisica = await this.pessoaFisicaRepository.update(cliente.pessoaFisica.toString(), dto, session)
                .then(res => {
                    if (!res) {
                        throw new HttpException(404, `Pessoa Fisica ${dto.nome} n??o encontrado`);
                    }
                    return res;
                });
            const pessoa = await this.pessoaRepository.update(pessoaFisica.pessoa.toString(), dto, session)
                .then(res => {
                    if (!res) {
                        throw new HttpException(404, `Pessoa ${dto.nome} n??o encontrado`);
                    }
                    return res;
                });

            await this.enderecoRepository.update(pessoa.endereco.toString(), dto, session)
                .then(res => {
                    if (!res) {
                        throw new HttpException(404, `Endere??o de ${dto.nome} n??o encontrado`);
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

    async recordsByMonth() {
        return await this.repository.recordsByMonth();
    }

    async recordsByStatus() {
        return await this.repository.recordsByStatus();
    }

}