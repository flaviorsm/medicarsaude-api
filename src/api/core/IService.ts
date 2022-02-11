export interface IService<T, D> {
    find(query: any): Promise<T[] | T>;

    findById(id: string): Promise<T>;

    create(dto: D, session?: any): Promise<T>;

    update(id: string, dto: D, session?: any): Promise<T>;

    delete(id: string): Promise<T>;

    alterStatus(id: string, body: any): Promise<T>;
}