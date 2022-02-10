import { Database } from "../../../config/db.config";
import { StatusEnum } from "../../../shared/enum/Status.enum";
import { Logger } from "../../../shared/logger/logger";
import { IRepository } from "../../repositories/base/IRepository";
import { EnderecoRepository } from "../../repositories/EnderecoRepository";
import { PessoaFisicaRepository } from "../../repositories/PessoaFisicaRepository";
import { PessoaJuridicaRepository } from "../../repositories/PessoaJuridicaRepository";
import { PessoaRepository } from "../../repositories/PessoaRepository";
import { IService } from "./IService";

export abstract class ServiceAbstract<T, D, TRepository extends IRepository<T, D>> implements IService<T, D> {

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
        return await this.repository.find(query)
            .catch(err => {
                this.logger.error(err);
                throw new Error(err);
            });
    }

    async findById(id: string): Promise<T> {
        return await this.repository.findById(id)
            .then(res => res)
            .catch(err => {
                this.logger.error(err);
                throw new Error(err);
            });
    }

    async create(dto: D): Promise<T> {
        return await this.repository.create(dto)
            .then(res => res)
            .catch(err => {
                this.logger.error(err);
                throw new Error(err);
            });
    }

    async update(id: string, dto: D): Promise<T> {
        return await this.repository.update(id, dto)
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