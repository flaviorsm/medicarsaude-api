import { StatusEnum } from '../enum/Status.enum';
import { Logger } from "../logger/logger";
import { Repository } from "./Repository";

export abstract class Service<TEntity, TDto, TRepository extends Repository<TEntity>> {

    protected logger: Logger;
    private repository: TRepository;

    constructor(repository: (new () => TRepository)) {
        this.repository = new repository();
        this.logger = new Logger();
    }

    find(query: any) {
        this.repository.find(query)
            .then(res => res)
            .catch(err => this.logger.error(err));
    }

    findById(id: string) {
        this.repository.findById(id)
            .then(res => res)
            .catch(err => this.logger.error(err));
    }

    create(dto: TDto) {
        this.repository.create(dto)
            .then(res => res)
            .catch(err => this.logger.error(err));
    }

    update(id: string, dto: TDto) {
        this.repository.update(id, dto)
            .then(res => res)
            .catch(err => this.logger.error(err));
    }

    delete(id: string) {
        this.repository.update(id, { status: StatusEnum.INATIVO })
            .then(res => res)
            .catch(err => this.logger.error(err));
    }

    alterStatus(id: string, body: any) {
        this.repository.update(id, body)
            .then(res => res)
            .catch(err => this.logger.error(err));
    }
}