import { NextFunction, Request, Response } from 'express';
import { DashboardService } from "../services/DashboardService";

export class DashboardController {

    private service: DashboardService;

    constructor() {
        this.service = new DashboardService();
    }

    salesPerMonth(req: Request, res: Response, next: NextFunction) {
        this.service.salesPerMonth()
            .then(result => res.json(result))
            .catch(err => next(err));
    }

    salesByStatus(req: Request, res: Response, next: NextFunction) {
        this.service.salesByStatus()
            .then(result => res.json(result))
            .catch(err => next(err));
    }

    customersPerMonth(req: Request, res: Response, next: NextFunction) {
        this.service.customersPerMonth()
            .then(result => res.json(result))
            .catch(err => next(err));
    }

    customersByStatus(req: Request, res: Response, next: NextFunction) {
        this.service.customersByStatus()
            .then(result => res.json(result))
            .catch(err => next(err));
    }

    paymentsByStatus(req: Request, res: Response, next: NextFunction) {
        this.service.paymentsByStatus()
            .then(result => res.json(result))
            .catch(err => next(err));
    }

    contractsActive(req: Request, res: Response, next: NextFunction) {
        this.service.contractsActive()
            .then(result => res.json(result))
            .catch(err => next(err));
    }

}