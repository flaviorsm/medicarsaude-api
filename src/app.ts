import * as bodyParser from 'body-parser';
import * as express from 'express';
import errorMiddleware from './shared/utils/Error.middleware';
import Routes from './routes';
import { Logger } from './shared/logger/logger';
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');

class App {

    express: express.Application;
    logger: Logger;

    private swaggerFile: any = (process.cwd() + '/swagger.json');
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);

    constructor() {
        this.express = express();
        this.middleware();
        this.swagger();
        this.routes();
        this.initializeErrorHandling();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private swagger() {
        this.express.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(this.swaggerDocument)
        );
    }

    private routes(): void {
        this.express.use('/', Routes);
    }

    private initializeErrorHandling() {
        this.express.use(errorMiddleware);
    }
}

export default new App().express;
