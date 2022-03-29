import * as express from 'express';
import ClienteRouter from './routes/cliente.route';
import ParceiroRouter from './routes/parceiro.route';
import PlanoRouter from './routes/plano.route';
import ColaboradorRouter from './routes/colaborador.route';
import ContratoRouter from './routes/contrato.route';
import PagamentoRouter from './routes/pagamento.route';
import VendaRouter from './routes/venda.route';
import UsuarioRouter from './routes/usuario.route';
import AutenticacaoRouter from './routes/autenticacao.route';
import DashboardRouter from './routes/dashboard.route';

class Routes {

    express: express.Application;

    constructor() {
        this.express = express();
        this.routes();
    }

    private routes(): void {
        this.express.get("/", (req, res, next) => {
            res.send('API Medicar Saúde - documentação em /api-docs');
        });

        this.express.use('/api',
            ContratoRouter,
            ClienteRouter,
            ParceiroRouter,
            ColaboradorRouter,
            UsuarioRouter,
            PagamentoRouter,
            PlanoRouter,
            VendaRouter,
            AutenticacaoRouter,
            DashboardRouter,
        );
    }
}

export default new Routes().express;