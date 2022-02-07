import { ServiceBase } from "../../shared/utils/ServiceBase";
import { StatusEnum } from './../../shared/enum/Status.enum';
import { ParceiroDTO } from './../dtos/ParceiroDTO';
import { IParceiro } from './../interfaces/IParceito';
import { ParceiroRepository } from './../repositories/ParceiroRepository';

export class ParceiroService extends ServiceBase<IParceiro, ParceiroDTO> {

    private parceiroRepository: ParceiroRepository;

    constructor() {
        super();
        this.parceiroRepository = new ParceiroRepository();
    }

    async find(query: any): Promise<IParceiro[] | IParceiro> {

        if (query.nome || query.email || query.telefone) {
            if (query.nome) {
                query = { nome: { "$regex": query.nome, "$options": "i" } };
            }
            let parceiros = [];
            const pessoa = await this.pessoaRepository.find(query);
            for (const ps of pessoa) {
                const pf = await this.pessoaFisicaRepository.findOne({ pessoa: ps._id });
                const cl = await this.parceiroRepository.findOne({ pessoaFisica: pf._id });
                parceiros.push(cl as IParceiro);
            }
            return parceiros;
        }

        else if (query.cpf) {
            const pessoaFisica = await this.pessoaFisicaRepository.findOne(query);
            return await this.parceiroRepository.findOne({ pessoaFisica: pessoaFisica._id })
                .catch(err => {
                    throw new Error(`==>: ${err}`);
                });
        }

        else if (query.cnpj) {
            const pessoaJuridica = await this.pessoaJuridicaRepository.findOne(query);
            return await this.parceiroRepository.findOne({ pessoaJuridica: pessoaJuridica._id })
                .catch(err => {
                    throw new Error(`==>: ${err}`);
                });;
        }

        else if (query.codigo) {
            return await this.parceiroRepository.findOne(query);
        }

        else {
            return await this.parceiroRepository.find({});
        }
    }

    async findById(id: string): Promise<IParceiro & { _id: string; }> {
        return await this.parceiroRepository.findById(id);
    }

    async create(dto: ParceiroDTO): Promise<IParceiro & { _id: string; }> {
        let entity = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            dto.endereco = await this.enderecoRepository.create(dto, session).then(ed => ed[0]._id);

            dto.pessoa = await this.pessoaRepository.create(dto, session).then(ps => ps[0]._id);

            if (dto.cpf) {
                dto.pessoaFisica = await this.pessoaFisicaRepository.create(dto, session).then(pf => pf[0]._id);
            } else {
                dto.pessoaJuridica = await this.pessoaJuridicaRepository.create(dto, session).then(pf => pf[0]._id);
            }

            entity = await this.parceiroRepository.create(dto, session).then(cli => cli[0]);

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            throw new Error(error);
        }

        session.endSession();

        if (entity) {
            return await this.findById(entity._id).then(cli => cli);
        }

        throw new Error("Erro ao criar parceiro!");
    }

    async update(id: string, dto: ParceiroDTO): Promise<IParceiro & { _id: string; }> {
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            const parceiro = await this.parceiroRepository.update(id, dto, session).then(cli => {
                if (cli) {
                    return cli;
                }
                throw new Error(`Parceiro ${dto.nome} não encontrado`);
            }).catch(err => {
                throw new Error(`Erro ao alterar Parceiro: ${err}`);
            });

            let pf_pj = null;
            if (parceiro.pessoaFisica) {
                pf_pj = await this.pessoaFisicaRepository.update(parceiro.pessoaFisica.toString(), dto, session).then(pf => pf)
                    .catch(err => {
                        throw new Error(`Erro ao alterar Pessoa Fisica: ${err}`);
                    });
            } else {
                pf_pj = await this.pessoaJuridicaRepository.update(parceiro.pessoaJuridica.toString(), dto, session).then(pj => pj)
                    .catch(err => {
                        throw new Error(`Erro ao alterar Pessoa Juridica: ${err}`);
                    });
            }

            const pessoa = await this.pessoaRepository.update(pf_pj.pessoa.toString(), dto, session).then(pes => pes)
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
        return await this.findById(id).then(cli => cli);
    }

    delete(id: string): Promise<IParceiro & { _id: string; }> {
        return this.parceiroRepository.update(id, { status: StatusEnum.INATIVO });
    }

    alterStatus(id: string, body: any): Promise<IParceiro & { _id: string; }> {
        return this.parceiroRepository.update(id, body);
    }
}