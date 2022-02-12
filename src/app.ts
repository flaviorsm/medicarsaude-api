import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Logger } from './shared/logger/logger';
import Routes from './routes/routes';
const swaggerUi = require('swagger-ui-express');
import fs = require('fs');

class App {

    express: express.Application;
    users: any[];
    logger: Logger;

    private swaggerFile: any = (process.cwd() + '/swagger.json');
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);

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
            swaggerUi.setup(this.swaggerDocument)
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
