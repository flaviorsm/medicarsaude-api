import app from './app';
import * as http from 'http';

import { Logger } from './shared/logger/logger';

require('dotenv').config();

const port = process.env.PORT || 3000;
const logger = new Logger();

app.set('port', port);
const server = http.createServer(app);
server.listen(port);

server.on('listening', (): void => {
        const addr = server.address();
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        logger.info(`Escutando em ${bind}`);
    });

module.exports = app;
