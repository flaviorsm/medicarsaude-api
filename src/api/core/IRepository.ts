export interface IRepository<T, D> {

    find(query: any): Promise<T[] | T>;

    findOne(query: any): Promise<T>;

    findById(id: string): Promise<(T)>;

    create(dto: D, session?: any): Promise<T>;

    update(id: string, dto: any, session?: any): Promise<T>;
}