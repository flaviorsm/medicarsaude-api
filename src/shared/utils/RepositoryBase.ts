import { Logger } from "../logger/logger";
export abstract class RepositoryBase<T> {

    protected logger: Logger;

    constructor() {
        this.logger = new Logger();
    }

    abstract find(query: any): Promise<(T & { _id: string; })[]>;

    abstract findOne(query: any): Promise<(T & { _id: string; })>;

    abstract findById(id: string): Promise<(T & { _id: string; })>;

    abstract create(entity: any, session: any): Promise<(T & { _id: string; })[]>;

    abstract update(id: string, entity: any, session?: any): Promise<(T & { _id: string; })>;
}
