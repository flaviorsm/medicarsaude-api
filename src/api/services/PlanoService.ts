import { StatusEnum } from './../../shared/enum/Status.enum';
import { ServiceBase } from "../../shared/utils/ServiceBase";
import { PlanoDTO } from "../dtos/PlanoDTO";
import { IPlano } from "../interfaces/IPlano";
import { PlanoRepository } from "../repositories/PlanoRepository";

export class PlanoService extends ServiceBase<IPlano, PlanoDTO> {

    private planoRepository: PlanoRepository;

    constructor() {
        super();
        this.planoRepository = new PlanoRepository();
    }

    async find(query: any): Promise<IPlano | IPlano[]> {
        if (query.nome) {
            query = { nome: { "$regex": query.nome, "$options": "i" } };
        } else {
            query = {};
        }

        return await this.planoRepository.find(query)
            .catch(err => {
                throw new Error(`==>: ${err}`);
            });
    }

    async findById(id: string): Promise<IPlano & { _id: string; }> {
        return await this.planoRepository.findById(id)
            .catch(err => {
                throw new Error(`==>: ${err}`);
            });
    }

    async create(dto: PlanoDTO): Promise<IPlano & { _id: string; }> {
        return await this.planoRepository.create(dto)
            .then(pl => pl[0])
            .catch(err => {
                throw new Error(`==>: ${err}`);
            });
    }

    async update(id: string, dto: PlanoDTO): Promise<IPlano & { _id: string; }> {
        return await this.planoRepository.update(id, dto)
            .then(pl => pl)
            .catch(err => {
                throw new Error(`==>: ${err}`);
            });
    }

    async delete(id: string): Promise<IPlano & { _id: string; }> {
        return await this.planoRepository.update(id, { status: StatusEnum.INATIVO })
            .then(pl => pl)
            .catch(err => {
                throw new Error(`==>: ${err}`);
            });
    }

    async alterStatus(id: string, body: any): Promise<IPlano & { _id: string; }> {
        return await this.planoRepository.update(id, body)
            .then(pl => pl)
            .catch(err => {
                throw new Error(`==>: ${err}`);
            });
    }
}