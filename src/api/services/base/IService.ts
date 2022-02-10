export interface IService<T, D> {
    find(query: any): Promise<T[] | T>;

    findById(id: string): Promise<T>;

    create(dto: D): Promise<T>;

    update(id: string, dto: D): Promise<T>;

    delete(id: string): Promise<T>;

    alterStatus(id: string, body: any): Promise<T>;
}