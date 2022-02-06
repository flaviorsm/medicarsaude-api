import { EnderecoRepository } from "../../api/repositories/EnderecoRepository";
import { PessoaFisicaRepository } from "../../api/repositories/PessoaFisicaRepository";
import { PessoaRepository } from "../../api/repositories/PessoaRepository";
import { Database } from "../../config/db.config";
import { Logger } from "../logger/logger";
import { PessoaJuridicaRepository } from '../../api/repositories/PessoaJuridicaRepository';

export abstract class ServiceBase<TEntity, TDto> {

    protected logger: Logger;
    protected database: Database;
    protected pessoaRepository: PessoaRepository;
    protected pessoaFisicaRepository: PessoaFisicaRepository;
    protected pessoaJuridicaRepository: PessoaJuridicaRepository;
    protected enderecoRepository: EnderecoRepository;

    constructor() {
        this.logger = new Logger();
        this.database = new Database();
        this.pessoaRepository = new PessoaRepository();
        this.pessoaFisicaRepository = new PessoaFisicaRepository();
        this.pessoaJuridicaRepository = new PessoaJuridicaRepository();
        this.enderecoRepository = new EnderecoRepository();
    }
    
    abstract find(query: any): Promise<TEntity[] | TEntity>;

    abstract findById(id: string): Promise<(TEntity & { _id: string; })>;

    abstract create(dto: TDto): Promise<TEntity & { _id: string; }>;

    abstract update(id: string, dto: TDto): Promise<(TEntity & { _id: string; })>;

    abstract delete(id: string): Promise<(TEntity & { _id: string; })>;

    abstract alterStatus(id: string, body: any): Promise<(TEntity & { _id: string; })>;


}