import { Repository } from '../../shared/utils/Repository';
import { IPlano } from "../interfaces/IPlano";
import { PlanoModel } from './../models/Plano.model';

export class PlanoRepository extends Repository<IPlano> {
       
    constructor() {
        super(PlanoModel);
    }
}