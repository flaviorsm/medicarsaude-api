import * as express from 'express';
import * as bodyParser from 'body-parser';

import ClienteRouter from './cliente.route';
import ParceiroRouter from './parceiro.route';
import PlanoRouter from './plano.route';
import ColaboradorRouter from './colaborador.route';

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
    }

    private routes(): void {
        this.express.use('/api', ClienteRouter);
        this.express.use('/api', ParceiroRouter);
        this.express.use('/api', PlanoRouter);
        this.express.use('/api', ColaboradorRouter);
    }
}

export default new Routes().express;