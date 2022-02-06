import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Logger } from './logger/logger';
import Routes from './routes/routes';
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

class App {

    express: express.Application;
    users: any[];
    logger: Logger;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.swagger();
    }

    private swagger() {
        this.express.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        );
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/', Routes);
    }
}

export default new App().express;
