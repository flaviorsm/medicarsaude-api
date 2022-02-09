import { StatusEnum } from '../../shared/enum/Status.enum';
import { ServiceBase } from "../../shared/utils/ServiceBase";
import { IColaborador } from "../interfaces/IColaborador";
import { ColaboradorDTO } from './../dtos/ColaboradorDTO';
import { ColaboradorRepository } from './../repositories/ColaboradorRepository';

export class ColaboradorService extends ServiceBase<IColaborador, ColaboradorDTO> {

    private colaboradorRepository: ColaboradorRepository;

    constructor() {
        super();
        this.colaboradorRepository = new ColaboradorRepository();
    }

    async find(query: any): Promise<IColaborador | IColaborador[]> {
        if (query.nome || query.email || query.telefone) {
            if (query.nome) {
                query = { nome: { "$regex": query.nome, "$options": "i" } };
            }
            let clientes = [];
            const pessoa = await this.pessoaRepository.find(query);
            for (const ps of pessoa) {
                const pf = await this.pessoaFisicaRepository.findOne({ pessoa: ps._id });
                const cl = await this.colaboradorRepository.findOne({ pessoaFisica: pf._id });
                clientes.push(cl as IColaborador);
            }
            return clientes;
        }

        else if (query.cpf) {
            const pessoaFisica = await this.pessoaFisicaRepository.findOne(query);
            return await this.colaboradorRepository.findOne({ pessoaFisica: pessoaFisica._id });
        }

        else if (query.codigo) {
            return await this.colaboradorRepository.findOne(query);
        }

        else {
            return await this.colaboradorRepository.find({});
        }
    }

    async findById(id: string): Promise<IColaborador & { _id: string; }> {
        return await this.colaboradorRepository.findById(id);
    }

    async create(dto: ColaboradorDTO): Promise<IColaborador & { _id: string; }> {
        let colaborador = null;
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            dto.endereco = await this.enderecoRepository.create(dto, session).then(ed => ed[0]._id);

            dto.pessoa = await this.pessoaRepository.create(dto, session).then(ps => ps[0]._id);

            dto.pessoaFisica = await this.pessoaFisicaRepository.create(dto, session).then(pf => pf[0]._id);

            colaborador = await this.colaboradorRepository.create(dto, session).then(res => res[0]);

            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            throw new Error(error);
        }

        session.endSession();

        if (colaborador) {
            return await this.colaboradorRepository.findById(colaborador._id);
        }

        return colaborador;
    }

    async update(id: string, dto: ColaboradorDTO): Promise<IColaborador & { _id: string; }> {
        const session = await this.database.conn.startSession();

        try {
            session.startTransaction();

            const cliente = await this.colaboradorRepository.update(id, dto, session).then(cli => {
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

    delete(id: string): Promise<IColaborador & { _id: string; }> {
        return this.colaboradorRepository.update(id, { status: StatusEnum.INATIVO });
    }

    alterStatus(id: string, body: any): Promise<IColaborador & { _id: string; }> {
        return this.colaboradorRepository.update(id, body);
    }

}