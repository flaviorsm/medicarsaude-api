const express = require('express');
const db = require('./database/config');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger.json')

const PORT = process.env.PORT || 3001;

class App {
    constructor() {
        this.express = express();

        this.database();
        this.middlewares();
        this.routes();
        this. swagger();

        this.express.listen(PORT, () =>
            console.log(`Sua API REST está funcionando na porta ${PORT}`)
        );
    }

    database() {
        mongoose.connect(db.uri, { useNewUrlParser: true });
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(require('./routes'));
    }

    swagger() {
        this.express.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        );
    }
}

module.exports = new App().express;