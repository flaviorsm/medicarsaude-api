import { connect } from '../../config/db.config';

export abstract class Repository<T> {

    constructor() {
        connect()
    }

    abstract getAll(): Promise<T[]>;

    abstract getById(id: string): Promise<T>;

    abstract create(entity: T, session: any): Promise<any>;

    abstract update(entity: T, session: any): Promise<any>;

    abstract delete(id: string, session: any): Promise<any>;
}
