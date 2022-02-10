import { IPlano } from "../interfaces/IPlano";
import { PlanoDTO } from './../dtos/PlanoDTO';
import { PlanoModel } from './../models/Plano.model';
import { RepositoryBase } from './base/RepositoryBase';

export class PlanoRepository extends RepositoryBase<IPlano, PlanoDTO> {

    constructor() {
        super(PlanoModel);
    }
}