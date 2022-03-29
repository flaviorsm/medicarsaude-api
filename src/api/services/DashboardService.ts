import { VendaService } from './VendaService';
export class DashboardService {

    private vendaService: VendaService;

    constructor() {
        this.vendaService = new VendaService();
    }

    async salesPerMonth() {
        return await this.vendaService.recordsByMonth();
    }
}