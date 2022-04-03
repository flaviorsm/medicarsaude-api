export interface IService<T, D> {

    find(query: any): Promise<T[]>;

    findById(id: string): Promise<T>;

    create(dto: D, session?: any): Promise<T>;

    update(id: string, dto: D, session?: any): Promise<T>;

    delete(id: string): Promise<boolean>;

    patch(id: string, body: any): Promise<T>;

    alterStatus(id: string, body: any): Promise<T>;

    entityToDTO(entity: T): D;

    entitiesToDtos(entities: T[]): D[]
}