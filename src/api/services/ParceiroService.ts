import { IPessoa } from './../interfaces/IPessoa';
import { ParceiroDTO } from './../dtos/ParceiroDTO';
import { IParceiro } from './../interfaces/IParceito';
import { ParceiroRepository } from './../repositories/ParceiroRepository';
import { ServiceBase } from '../../core/ServiceBase';
import APIException from '../../shared/utils/exceptions/APIException';

export class ParceiroService extends ServiceBase<IParceiro, ParceiroDTO, ParceiroRepository> {

    constructor() {
        super(ParceiroRepository);
    }

    async create(dto: ParceiroDTO): Promise<IParceiro> {
        let entity = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            dto.endereco = await this.enderecoRepository.create(dto, session).then(ed => ed._id);

            if (dto.cpf) {
                const pessoaFisica = await this.pessoaFisicaRepository.findOne({ cpf: dto.cpf });
                if (!pessoaFisica) {
                    dto.pessoa = await this.pessoaRepository.create(dto, session).then(ps => ps._id);
                    dto.pessoaFisica = await this.pessoaFisicaRepository.create(dto, session).then(pf => pf._id);
                } else {
                    dto.pessoaFisica = pessoaFisica._id;
                }
            } else {
                const pessoaJuridica = await this.pessoaJuridicaRepository.findOne({ cnpj: dto.cnpj });
                if (!pessoaJuridica) {
                    dto.pessoa = await this.pessoaRepository.create(dto, session).then(ps => ps._id);
                    dto.pessoaJuridica = await this.pessoaJuridicaRepository.create(dto, session).then(pf => pf._id);
                } else {
                    dto.pessoaJuridica = pessoaJuridica._id;
                }
            }

            entity = await this.repository.create(dto, session).then(cli => cli);

            await session.commitTransaction();

            session.endSession();

            if (entity) {
                return await super.findById(entity._id).then(cli => cli);
            }

            return entity;

        } catch (error) {
            await session.abortTransaction();
            throw new APIException(error);
        }
    }

    async update(id: string, dto: ParceiroDTO): Promise<IParceiro> {
        const parceiro = await this.repository.findById(id);
        this.logger.info('==>', parceiro);

        const session = await this.database.conn.startSession();
        try {
            session.startTransaction();
            await this.repository.update(id, dto, session)
                .then(par => par)
                .catch(error => {
                    error.message += ` Parceiro ${dto.nome} não encontrado`;
                    throw new APIException(error);
                });


            let pessoa: IPessoa;

            if (parceiro.pessoaFisica) {
                await this.pessoaFisicaRepository.update(parceiro.pessoaFisica._id, dto, session)
                    .then(res => res)
                    .catch(error => {
                        error.message += ` Erro ao alterar Pessoa Fisica`;
                        throw new APIException(error);
                    });
                pessoa = parceiro.pessoaFisica.pessoa;
            }
            if (parceiro.pessoaJuridica) {
                await this.pessoaJuridicaRepository.update(parceiro.pessoaJuridica._id, dto, session)
                    .then(res => res)
                    .catch(error => {
                        error.message += ` Erro ao alterar Pessoa Juridica`;
                        throw new APIException(error);
                    });
                pessoa = parceiro.pessoaJuridica.pessoa;
            }

            await this.pessoaRepository.update(pessoa._id, dto, session)
                .then(res => res)
                .catch(error => {
                    error.message += ` Erro ao alterar Pessoa`;
                    throw new APIException(error);
                });

            await this.enderecoRepository.update(pessoa.endereco._id, dto, session)
                .then(res => res)
                .catch(error => {
                    error.message += ` Erro ao alterar Endereço`;
                    throw new APIException(error);
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