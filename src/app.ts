import * as express from 'express';
import Routes from './routes/routes';
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

    private routes(): void {
        this.express.use('/', Routes);
    }
}

export default new App().express;
