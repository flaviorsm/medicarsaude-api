import { ContratoDTO } from '../dtos/ContratoDTO';
import { IContrato } from "../interfaces/IContrato";
import { ContratoModel } from './../models/Contrato.model';
import { RepositoryBase } from './base/RepositoryBase';

export class ContratoRepository extends RepositoryBase<IContrato, ContratoDTO> {

    constructor() {
        super(ContratoModel);
    }

    async find(query: any): Promise<IContrato | IContrato[]> {
        return await ContratoModel.find(query)
            .populate('Plano');
            // .populate({
            //     path: 'cliente',
            //     populate: {
            //         path: 'pessoaFisica',
            //         populate: {
            //             path: 'pessoa',
            //             populate: {
            //                 path: 'endereco'
            //             }
            //         }
            //     }
            // })
            // .populate({
            //     path: 'colaborador',
            //     populate: {
            //         path: 'pessoaFisica',
            //         populate: {
            //             path: 'pessoa'
            //         }
            //     }
            // })
            // .populate('pagamentos')
    }
}
