import { IColaborador } from "../interfaces/IColaborador";
import { ColaboradorDTO } from './../dtos/ColaboradorDTO';
import { ColaboradorRepository } from './../repositories/ColaboradorRepository';
import { ServiceBase } from '../core/ServiceBase';

export class ColaboradorService extends ServiceBase<IColaborador, ColaboradorDTO, ColaboradorRepository> {

    constructor() {
        super(ColaboradorRepository);
    }

    async create(dto: ColaboradorDTO): Promise<IColaborador> {
        let colaborador = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            dto.endereco = await this.enderecoRepository.create(dto, session).then(ed => ed._id);

            dto.pessoa = await this.pessoaRepository.create(dto, session).then(ps => ps._id);

            dto.pessoaFisica = await this.pessoaFisicaRepository.create(dto, session).then(pf => pf._id);

            colaborador = await this.repository.create(dto, session).then(res => res);

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            throw new Error(error);
        }

        session.endSession();

        if (colaborador) {
            return await this.repository.findById(colaborador._id);
        }

        return colaborador;
    }

    async update(id: string, dto: ColaboradorDTO): Promise<IColaborador> {
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            const result = await this.repository.update(id, dto, session).then(cli => {
                if (cli) {
                    return cli;
                }
                throw new Error(`Cliente ${dto.nome} não encontrado`);
            }).catch(err => {
                throw new Error(`Erro ao alterar Cliente: ${err}`);
            });

            const pessoaFisica = await this.pessoaFisicaRepository.update(result.pessoaFisica.toString(), dto, session).then(pf => pf)
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
        return await this.findById(id);
    }
}