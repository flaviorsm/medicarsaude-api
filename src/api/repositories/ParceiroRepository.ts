import { RepositoryBase } from '../../core/RepositoryBase';
import { ParceiroDTO } from '../dtos/ParceiroDTO';
import { IParceiro } from '../interfaces/IParceito';
import { ParceiroModel } from '../models/Parceiro.model';
import { PlanoModel } from '../models/Plano.model';

export class ParceiroRepository extends RepositoryBase<IParceiro, ParceiroDTO> {

    constructor() {
        super(ParceiroModel);
    }

    async find(query: any): Promise<IParceiro[]> {
        return await ParceiroModel.find(query)
            .populate({ path: 'planos', model: PlanoModel, select: '_id nome' })
            .populate({
                path: 'pessoaFisica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            })
            .populate({
                path: 'pessoaJuridica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            });
    }

    async findOne(query: any): Promise<IParceiro> {
        return await ParceiroModel.findOne(query)
            .populate({ path: 'planos', model: PlanoModel, select: '_id nome' })
            .populate({
                path: 'pessoaFisica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            })
            .populate({
                path: 'pessoaJuridica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            });
    }

    async findById(id: string): Promise<IParceiro> {
        return await ParceiroModel.findById(id)
            .populate({ path: 'planos', model: PlanoModel, select: '_id nome' })
            .populate({
                path: 'pessoaFisica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            })
            .populate({
                path: 'pessoaJuridica',
                populate: {
                    path: 'pessoa',
                    populate: 'endereco'
                }
            });
    }

}