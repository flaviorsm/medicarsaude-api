import { PlanoDTO } from '../dtos/PlanoDTO';
import { IPlano } from '../interfaces/IPlano';
import { PlanoRepository } from '../repositories/PlanoRepository';
import { ServiceBase } from '../core/ServiceBase';

export class PlanoService extends ServiceBase<IPlano, PlanoDTO, PlanoRepository> {

    constructor() {
        super(PlanoRepository);
    }

    async find(query: any): Promise<IPlano | IPlano[]> {
        if (query.nome) {
            query = { nome: { '$regex': query.nome, '$options': 'i' } };
            return await this.repository.find(query);

        } else if (query.codigo) {
            return await this.repository.findOne(query);

        }

        return await super.find({});
    }
}