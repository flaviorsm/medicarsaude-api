import { StatusEnum } from './../../shared/enum/Status.enum';
import { ServiceBase } from "../../shared/utils/ServiceBase";
import { PlanoDTO } from "../dtos/PlanoDTO";
import { IPlano } from "../interfaces/IPlano";
import { PlanoRepository } from "../repositories/PlanoRepository";
import { ServiceAbstract } from './base/ServiceAbstract';

export class PlanoService extends ServiceAbstract<IPlano, PlanoDTO, PlanoRepository> {

    constructor() {
        super(PlanoRepository);
    }

    async find(query: any): Promise<IPlano | IPlano[]> {
        if (query.nome) {
            query = { nome: { "$regex": query.nome, "$options": "i" } };
        } else {
            query = {};
        }
        return await super.find(query);
    }
}