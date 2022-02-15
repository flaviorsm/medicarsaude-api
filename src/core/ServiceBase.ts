
import { EnderecoRepository } from '../api/repositories/EnderecoRepository';
import { PessoaFisicaRepository } from '../api/repositories/PessoaFisicaRepository';
import { PessoaJuridicaRepository } from '../api/repositories/PessoaJuridicaRepository';
import { PessoaRepository } from '../api/repositories/PessoaRepository';
import { Database } from '../config/db.config';
import { StatusEnum } from '../shared/enum/Status.enum';
import { Logger } from '../shared/logger/logger';
import { IRepository } from './IRepository';
import { IService } from './IService';

export abstract class ServiceBase<T, D, TRepository extends IRepository<T, D>> implements IService<T, D> {

    protected logger: Logger;
    protected repository: TRepository;
    protected database: Database;
    protected pessoaRepository: PessoaRepository;
    protected pessoaFisicaRepository: PessoaFisicaRepository;
    protected pessoaJuridicaRepository: PessoaJuridicaRepository;
    protected enderecoRepository: EnderecoRepository;

    constructor(repository: (new () => TRepository)) {
        this.logger = new Logger();
        this.repository = new repository();
        this.database = new Database();

        this.pessoaRepository = new PessoaRepository();
        this.pessoaFisicaRepository = new PessoaFisicaRepository();
        this.pessoaJuridicaRepository = new PessoaJuridicaRepository();
        this.enderecoRepository = new EnderecoRepository();
    }

    async find(query: any): Promise<T | T[]> {
        try {
            if (query.nome || query.email || query.telefone) {
                if (query.nome) {
                    query = { nome: { '$regex': query.nome, '$options': 'i' } };
                }
                const result = [];
                const pessoa = await this.pessoaRepository.find(query);
                if (pessoa.length > 0) {
                    for (const ps of pessoa) {
                        let entity = null;
                        const pf = await this.pessoaFisicaRepository.findOne({ pessoa: ps._id });
                        if (pf) {
                            entity = await this.repository.findOne({ pessoaFisica: pf._id });
                            result.push(entity as T);
                        }
                        const pj = await this.pessoaJuridicaRepository.findOne({ pessoa: ps._id });
                        if (pj) {
                            entity = await this.repository.findOne({ pessoaJuridica: pj._id });
                            result.push(entity as T);
                        }
                    }
                }
                return result;
            }

            else if (query.cpf) {
                return await this.pessoaFisicaRepository.findOne(query).then(async res => {
                    if (res) {
                        return await this.repository.findOne({ pessoaFisica: res._id });
                    }
                    return {} as T;
                });
            }

            else if (query.cnpj) {
                return await this.pessoaJuridicaRepository.findOne(query).then(async res => {
                    if (res) {
                        return await this.repository.findOne({ pessoaJuridica: res._id });
                    }
                    return {} as T;
                });
            }

            else if (query.codigo) {
                return await this.repository.findOne(query).then(res => {
                    if (res) {
                        return res;
                    }
                    return {} as T;
                });
            }

            else {
                return await this.repository.find({});
            }
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }

    async findById(id: string): Promise<T> {
        return await this.repository.findById(id)
            .then(res => res)
            .catch(err => {
                this.logger.error(err);
                throw new Error(err);
            });
    }

    async create(dto: D, session?: any): Promise<T> {
        return await this.repository.create(dto, session)
            .then(res => res)
            .catch(err => {
                this.logger.error(err);
                throw new Error(err);
            });
    }

    async update(id: string, dto: D, session?: any): Promise<T> {
        return await this.repository.update(id, dto, session)
            .then(res => res)
            .catch(err => {
                this.logger.error(err);
                throw new Error(err);
            });
    }

    async delete(id: string): Promise<T> {
        return await this.repository.update(id, { status: StatusEnum.INATIVO })
            .then(res => res)
            .catch(err => {
                this.logger.error(err);
                throw new Error(err);
            });
    }

    async alterStatus(id: string, body: any): Promise<T> {
        return await this.repository.update(id, body)
            .then(res => res)
            .catch(err => {
                this.logger.error(err);
                throw new Error(err);
            });
    }
}
