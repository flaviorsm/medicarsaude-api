import { Model } from "mongoose";
import { Logger } from "../logger/logger";

export abstract class Repository<T> {

    protected logger: Logger;

    constructor(private model: Model<T, {}, {}, {}>) {
        this.logger = new Logger();
    }

    async find(query: any) {
        return await this.model.find(query);
    }

    async findOne(query: any) {
        return await this.model.findOne(query);
    }

    async findById(id: string) {
        return await this.model.findById(id);
    }

    async create(entity: any, session?: any) {
        return await this.model.create([entity], { session });
    }

    async update(id: string, entity: any, session?: any) {
        return await this.model.findByIdAndUpdate(id, entity, { session });
    }
}