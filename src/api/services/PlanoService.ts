import { ServiceBase } from '../../core/ServiceBase';
import APIException from '../../shared/utils/exceptions/APIException';
import { PlanoDTO } from '../dtos/PlanoDTO';
import { IPlano } from '../interfaces/IPlano';
import { PlanoRepository } from '../repositories/PlanoRepository';

export class PlanoService extends ServiceBase<IPlano, PlanoDTO, PlanoRepository> {

    constructor() {
        super(PlanoRepository);
    }

    entityToDTO(entity: IPlano): PlanoDTO {
        return {
            id: entity._id,
            nome: entity.nome,
            descricao: entity.descricao,
            status: entity.status,
            valor: entity.valor,
        };
    }

    async find(query: any): Promise<IPlano[]> {
        try {
            const planos = [];
            if (query.nome) {
                query = { nome: { '$regex': query.nome, '$options': 'i' } };
                return await this.repository.find(query);

            } else if (query.codigo) {
                const plano = await this.repository.findOne(query);
                planos.push(plano);
                return planos;
            }

            return await super.find({});

        } catch (error) {
            throw new APIException(error);
        }

    }
}