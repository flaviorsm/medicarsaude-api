import { ColaboradorService } from './ColaboradorServices';
import { VendaDTO } from '../dtos/VendaDTO';
import { IVenda } from '../interfaces/IVenda';
import { VendaRepository } from '../repositories/VendaRepository';
import { ServiceBase } from '../../core/ServiceBase';
import { ClienteService } from './ClienteService';
import { PlanoService } from './PlanoService';

export class VendaService extends ServiceBase<IVenda, VendaDTO, VendaRepository> {

    private planoService: PlanoService;

    constructor() {
        super(VendaRepository);
        this.planoService = new PlanoService();
    }

    entityToDTO(entity: IVenda): VendaDTO {
        return {
            id: entity._id,
            codigo: entity.codigo,
            dataVenda: entity.dataVenda,
            cliente: {
                id: entity.cliente._id,
                nome: entity.cliente.pessoaFisica.pessoa.nome,
                cpf: entity.cliente.pessoaFisica.cpf,
                email: entity.cliente.pessoaFisica.pessoa.email,
                telefone: entity.cliente.pessoaFisica.pessoa.telefone,
                endereco: entity.cliente.pessoaFisica.pessoa.endereco,
                dataNascimento: entity.cliente.pessoaFisica.dataNascimento,
            },
            plano: this.planoService.entityToDTO(entity.plano),
            vendedor: {
                id: entity.vendedor._id,
                codigo: entity.vendedor.codigo,
                nome: entity.vendedor.pessoaFisica.pessoa.nome,
                email: entity.vendedor.pessoaFisica.pessoa.email,
                telefone: entity.vendedor.pessoaFisica.pessoa.telefone,
            }
        }
    }
}