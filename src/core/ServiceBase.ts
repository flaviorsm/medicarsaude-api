
import { EnderecoRepository } from '../api/repositories/EnderecoRepository';
import { PessoaFisicaRepository } from '../api/repositories/PessoaFisicaRepository';
import { PessoaJuridicaRepository } from '../api/repositories/PessoaJuridicaRepository';
import { PessoaRepository } from '../api/repositories/PessoaRepository';
import { Database } from '../config/db.config';
import { StatusEnum } from '../shared/enum/Status.enum';
import { Logger } from '../shared/logger/logger';
import APIException from '../shared/utils/exceptions/APIException';
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

    abstract entityToDTO(entity: T): D;

    entitiesToDtos(entities: T[]): D[] {
        const dtos = [] as D[];
        for (const entity of entities) {
            dtos.push(this.entityToDTO(entity));
        }
        return dtos;
    }

    async find(query: any): Promise<T[]> {
        this.logger.info("-->", query);
        try {
            const result = [];
            let entity = {} as T;

            if (query.nome || query.email || query.telefone) {
                if (query.nome) {
                    query = { nome: { '$regex': query.nome, '$options': 'i' } };
                }
                const pessoa = await this.pessoaRepository.find(query);
                if (pessoa.length > 0) {
                    for (const ps of pessoa) {
                        const pf = await this.pessoaFisicaRepository.findOne({ pessoa: ps._id });
                        if (pf) {
                            entity = await this.repository.findOne({ pessoaFisica: pf._id });
                            result.push(entity);
                        }
                        const pj = await this.pessoaJuridicaRepository.findOne({ pessoa: ps._id });
                        if (pj) {
                            entity = await this.repository.findOne({ pessoaJuridica: pj._id });
                            result.push(entity);
                        }
                    }
                }
            }

            else if (query.cpf) {
                await this.pessoaFisicaRepository.findOne(query).then(async res => {
                    if (res) {
                        entity = await this.repository.findOne({ pessoaFisica: res._id });
                        result.push(entity);
                    }
                });
            }

            else if (query.cnpj) {
                await this.pessoaJuridicaRepository.findOne(query).then(async res => {
                    if (res) {
                        entity = await this.repository.findOne({ pessoaJuridica: res._id });
                        result.push(entity);
                    }
                });
            }

            else if (query.codigo) {
                await this.repository.findOne(query).then(res => {
                    if (res) {
                        result.push(res);
                    }
                });
            }

            else {
                return await this.repository.find({});
            }

            return result;
        } catch (error) {
            throw new APIException(error);
        }
    }

    async findById(id: string): Promise<T> {
        return await this.repository
            .findById(id)
            .catch(error => {
                throw new APIException(error);
            });
    }

    async create(dto: D, session?: any): Promise<T> {
        return await this.repository.create(dto, session)
            .then(res => res)
            .catch(error => {
                throw new APIException(error);
            });
    }

    async update(id: string, dto: D, session?: any): Promise<T> {
        return await this.repository.update(id, dto, session)
            .then(res => res)
            .catch(error => {
                throw new APIException(error);
            });
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id)
            .then(res => res)
            .catch(error => {
                throw new APIException(error);
            });
    }

    async alterStatus(id: string, body: any): Promise<T> {
        return await this.repository.update(id, body)
            .then(res => res)
            .catch(error => {
                throw new APIException(error);
            });
    }

    async patch(id: string, body: any): Promise<T> {
        return await this.repository.update(id, body)
            .then(res => res)
            .catch(error => {
                throw new APIException(error);
            });
    }
}
