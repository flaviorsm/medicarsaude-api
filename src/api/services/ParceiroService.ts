import { PlanoService } from './PlanoService';
import { IPessoa } from './../interfaces/IPessoa';
import { ParceiroDTO } from './../dtos/ParceiroDTO';
import { IParceiro } from './../interfaces/IParceito';
import { ParceiroRepository } from './../repositories/ParceiroRepository';
import { ServiceBase } from '../../core/ServiceBase';
import APIException from '../../shared/utils/exceptions/APIException';

export class ParceiroService extends ServiceBase<IParceiro, ParceiroDTO, ParceiroRepository> {

    private planoService: PlanoService

    constructor() {
        super(ParceiroRepository);
        this.planoService = new PlanoService();
    }

    entityToDTO(entity: IParceiro): ParceiroDTO {

        const dadosParceiro = entity.pessoaFisica ?? entity.pessoaJuridica;

        return {
            id: entity._id,
            categoria: entity.categoria,
            status: entity.status,
            planos: this.planoService.entitiesToDtos(entity.planos),

            nome: dadosParceiro.pessoa.nome,
            email: dadosParceiro.pessoa.email,
            telefone: dadosParceiro.pessoa.telefone,

            cpf: entity.pessoaFisica?.cpf,
            rg: entity.pessoaFisica?.rg,
            CRM: entity.CRM,
            dataNascimento: entity.pessoaFisica?.dataNascimento,

            cnpj: entity.pessoaJuridica?.cnpj,
            nomeFantasia: entity.pessoaJuridica?.nomeFantasia,
            IE: entity.pessoaJuridica?.IE,
            dataFundacao: entity.pessoaJuridica?.dataFundacao,

            cep: dadosParceiro.pessoa.endereco.cep,
            rua: dadosParceiro.pessoa.endereco.rua,
            bairro: dadosParceiro.pessoa.endereco.bairro,
            cidade: dadosParceiro.pessoa.endereco.cidade,
            estado: dadosParceiro.pessoa.endereco.estado,
        }
    }

    async create(dto: ParceiroDTO): Promise<IParceiro> {
        let entity = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            dto.endereco = await this.enderecoRepository.create(dto, session).then(ed => ed._id);
            const pessoaDto = { nome: dto.nome, email: dto.email, telefone: dto.telefone, endereco: dto.endereco };

            if (dto.cpf) {
                const pessoaFisica = await this.pessoaFisicaRepository.findOne({ cpf: dto.cpf });
                if (!pessoaFisica) {
                    dto.pessoa = await this.pessoaRepository.create(pessoaDto, session).then(ps => ps._id);

                    const pfDto = { cpf: dto.cpf, rg: dto.rg, dataNascimento: dto.dataNascimento, pessoa: dto.pessoa };
                    dto.pessoaFisica = await this.pessoaFisicaRepository.create(pfDto, session).then(pf => pf._id);
                } else {
                    dto.pessoaFisica = pessoaFisica._id;
                }
            } else {
                const pessoaJuridica = await this.pessoaJuridicaRepository.findOne({ cnpj: dto.cnpj });
                if (!pessoaJuridica) {
                    dto.pessoa = await this.pessoaRepository.create(pessoaDto, session).then(ps => ps._id);

                    const pjDto = { cnpj: dto.cnpj, nomeFantasia: dto.nomeFantasia, IE: dto.IE, dataFundacao: dto.dataFundacao, pessoa: dto.pessoa };
                    dto.pessoaJuridica = await this.pessoaJuridicaRepository.create(pjDto, session).then(pf => pf._id);
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
                const pfDto = { cpf: dto.cpf, rg: dto.rg, dataNascimento: dto.dataNascimento };
                await this.pessoaFisicaRepository.update(parceiro.pessoaFisica._id, pfDto, session)
                    .then(res => res)
                    .catch(error => {
                        error.message += ` Erro ao alterar Pessoa Fisica`;
                        throw new APIException(error);
                    });
                pessoa = parceiro.pessoaFisica.pessoa;
            }

            if (parceiro.pessoaJuridica) {
                const pjDto = { cnpj: dto.cnpj, nomeFantasia: dto.nomeFantasia, IE: dto.IE, dataFundacao: dto.dataFundacao };
                await this.pessoaJuridicaRepository.update(parceiro.pessoaJuridica._id, pjDto, session)
                    .then(res => res)
                    .catch(error => {
                        error.message += ` Erro ao alterar Pessoa Juridica`;
                        throw new APIException(error);
                    });
                pessoa = parceiro.pessoaJuridica.pessoa;
            }

            const psDto = { nome: dto.nome, email: dto.email, telefone: dto.telefone };
            await this.pessoaRepository.update(pessoa._id, psDto, session)
                .then(res => res)
                .catch(error => {
                    error.message += ` Erro ao alterar Pessoa`;
                    throw new APIException(error);
                });
            const endDto = { cep: dto.cep, rua: dto.rua, bairro: dto.bairro, cidade: dto.cidade, estado: dto.estado };
            await this.enderecoRepository.update(pessoa.endereco._id, endDto, session)
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