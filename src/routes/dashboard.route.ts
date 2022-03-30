import { Router } from "express";
import { DashboardController } from "../api/controllers/DashboardController";

const router = Router();
const controller = new DashboardController();

router.get('/dashboard/vendas/mensal', (req, res, next) => {
    controller.salesPerMonth(req, res, next);
});

router.get('/dashboard/vendas/status', (req, res, next) => {
    controller.salesByStatus(req, res, next);
});

router.get('/dashboard/clientes/mensal', (req, res, next) => {
    controller.customersPerMonth(req, res, next);
});

router.get('/dashboard/clientes/status', (req, res, next) => {
    controller.customersByStatus(req, res, next);
});

router.get('/dashboard/pagamentos', (req, res, next) => {
    controller.paymentsByStatus(req, res, next);
});

router.get('/dashboard/contratos', (req, res, next) => {
    controller.contractsActive(req, res, next);
});

export default router;