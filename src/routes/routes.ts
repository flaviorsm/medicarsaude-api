import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Logger } from '../logger/logger';

import ClienteRouter from './cliente.route';

class Routes {

    express: express.Application;
    logger: Logger;

    clientes: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new Logger();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/cliente', ClienteRouter);
    }
}

export default new Routes().express;