interface ICRUD<T> {
    find(query: any): Promise<(T & { _id: string; })[]>;

    findOne(query: any): Promise<(T & { _id: string; })>;

    findById(id: string): Promise<(T & { _id: string; })>;

    create(entity: any, session: any): Promise<(T & { _id: string; })[]>;

    update(id: string, entity: any, session: any): Promise<(T & { _id: string; })>;

    delete(id: string, session: any): void;
}