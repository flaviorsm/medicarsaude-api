import { ClienteService } from './ClienteService';
import { ContratoService } from './ContratoService';
import { PagamentoService } from './PagamentoService';
import { VendaService } from './VendaService';

export class DashboardService {

    private vendaService: VendaService;
    private pagamentoService: PagamentoService;
    private contratoService: ContratoService;
    private clienteService: ClienteService;

    constructor() {
        this.vendaService = new VendaService();
        this.pagamentoService = new PagamentoService();
        this.contratoService = new ContratoService();
        this.clienteService = new ClienteService();
    }

    async salesPerMonth() {
        return await this.vendaService.recordsByMonth();
    }

    async salesByStatus() {
        return await this.vendaService.recordsByStatus();
    }

    async customersPerMonth() {
        return await this.clienteService.recordsByMonth();
    }

    async customersByStatus() {
        return await this.clienteService.recordsByStatus();
    }

    async paymentsByStatus() {
        return await this.pagamentoService.recordsByStatus();
    }

    async contractsActive() {
        return await this.contratoService.recordsActive();
    }
}