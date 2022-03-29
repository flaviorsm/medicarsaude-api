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

}