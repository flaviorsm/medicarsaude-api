import { ClienteDTO } from '../dto/ClienteDTO';
import { Cliente } from '../interfaces/Cliente';
import { ClienteService } from '../services/ClienteService';

export class ClienteController {

    private clienteService: ClienteService;

    constructor() {
        this.clienteService = new ClienteService();
    }

    async getAll() {
        return await this.clienteService.getAll();
    }

    async getById(id: string) {
        return await this.clienteService.getById(id);
    }

    async create(dto: ClienteDTO) {
        return await this.clienteService.create(dto);
    }

    async update(entity: Cliente) {
        return await this.clienteService.update(entity);
    }

    async delete(id: string) {
        await this.clienteService.delete(id);
    }
}