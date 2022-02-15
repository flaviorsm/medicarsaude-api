import { Model } from 'mongoose';
import { Logger } from '../shared/logger/logger';
import { IRepository } from './IRepository';

export abstract class RepositoryBase<T, D> implements IRepository<T, D> {

    protected logger: Logger;

    constructor(private model: Model<T, {}, {}, {}>) {
        this.logger = new Logger();
    }

    async find(query: any): Promise<T | T[]> {
        return await this.model.find(query);
    }

    async findOne(query: any): Promise<T> {
        return await this.model.findOne(query);
    }

    async findById(id: string): Promise<T> {
        return await this.model.findById(id);
    }

    async create(dto: D, session?: any): Promise<T> {
        return await this.model.create([dto], { session }).then(res => res[0]);
    }

    async update(id: string, dto: D, session?: any): Promise<T> {
        return await this.model.findByIdAndUpdate(id, dto, { session });
    }
}