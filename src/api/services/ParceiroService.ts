import { ParceiroDTO } from './../dtos/ParceiroDTO';
import { IParceiro } from './../interfaces/IParceito';
import { ParceiroRepository } from './../repositories/ParceiroRepository';
import { ServiceBase } from '../../core/ServiceBase';

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

            dto.pessoa = await this.pessoaRepository.create(dto, session).then(ps => ps._id);

            if (dto.cpf) {
                dto.pessoaFisica = await this.pessoaFisicaRepository.create(dto, session).then(pf => pf._id);
            } else {
                dto.pessoaJuridica = await this.pessoaJuridicaRepository.create(dto, session).then(pf => pf._id);
            }

            entity = await super.create(dto, session).then(cli => cli);

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            throw new Error(error);
        }

        session.endSession();

        if (entity) {
            return await this.findById(entity._id);
        }

        throw new Error('Erro ao criar parceiro!');
    }

    async update(id: string, dto: ParceiroDTO): Promise<IParceiro> {
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            const parceiro = await super.update(id, dto, session).then(cli => {
                if (cli) {
                    return cli;
                }
                throw new Error(`Parceiro ${dto.nome} não encontrado`);
            }).catch(err => {
                throw new Error(`Erro ao alterar Parceiro: ${err}`);
            });

            let fisicaOuJuridica = null;
            if (parceiro.pessoaFisica) {
                fisicaOuJuridica = await this.pessoaFisicaRepository.update(parceiro.pessoaFisica.toString(), dto, session).then(pf => pf)
                    .catch(err => {
                        throw new Error(`Erro ao alterar Pessoa Fisica: ${err}`);
                    });
            } else {
                fisicaOuJuridica = await this.pessoaJuridicaRepository.update(parceiro.pessoaJuridica.toString(), dto, session).then(pj => pj)
                    .catch(err => {
                        throw new Error(`Erro ao alterar Pessoa Juridica: ${err}`);
                    });
            }

            const pessoa = await this.pessoaRepository.update(fisicaOuJuridica.pessoa.toString(), dto, session).then(pes => pes)
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
        return await this.findById(id);
    }
}