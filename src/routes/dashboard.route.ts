import { Router } from "express";
import { DashboardController } from "../api/controllers/DashboardController";

const router = Router();
const controller = new DashboardController();

router.get('/dashboard/vendas', (req, res, next) => {
    controller.salesPerMonth(req, res, next);
});

export default router;