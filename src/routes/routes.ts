import * as express from 'express';
import * as bodyParser from 'body-parser';

import ClienteRouter from './cliente.route';
import ParceiroRouter from './parceiro.route';
import PlanoRouter from './plano.route';
import ColaboradorRouter from './colaborador.route';
import ContratoRouter from './contrato.route';
import PagamentoRouter from './pagamento.route';
import VendaRouter from './venda.route';

class Routes {

    express: express.Application;

    clientes: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            next();
        });
    }

    private routes(): void {
        this.express.use('/api',
            VendaRouter,
            ClienteRouter,
            ParceiroRouter,
            PlanoRouter,
            ColaboradorRouter,
            ContratoRouter,
            PagamentoRouter
        );
    }
}

export default new Routes().express;