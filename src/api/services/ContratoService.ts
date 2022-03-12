import { ServiceBase } from '../../core/ServiceBase';
import { ContratoDTO } from '../dtos/ContratoDTO';
import { IContrato } from '../interfaces/IContrato';
import { ContratoRepository } from '../repositories/ContratoRepository';
import { PlanoService } from './PlanoService';

export class ContratoService extends ServiceBase<IContrato, ContratoDTO, ContratoRepository> {

    constructor() {
        super(ContratoRepository);
    }

    entityToDTO(entity: IContrato): ContratoDTO {
        return {
            id: entity._id,
            codigo: entity.codigo,
            status: entity.status,
            plano: new PlanoService().entityToDTO(entity.plano),
            cliente: {
                nome: entity.cliente.pessoaFisica.pessoa.nome,
                cpf: entity.cliente.pessoaFisica.cpf,
                email: entity.cliente.pessoaFisica.pessoa.email,
                telefone: entity.cliente.pessoaFisica.pessoa.telefone,
                endereco: entity.cliente.pessoaFisica.pessoa.endereco,
            },
            vendedor: {
                codigo: entity.vendedor.codigo,
                nome: entity.vendedor.pessoaFisica.pessoa.nome,
                email: entity.vendedor.pessoaFisica.pessoa.email,
                telefone: entity.vendedor.pessoaFisica.pessoa.telefone,
            },
            pagamentos: entity.pagamentos,
        };
    }

}