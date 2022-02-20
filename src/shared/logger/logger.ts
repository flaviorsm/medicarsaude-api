const pine = require('pine');

const logger = pine();

export class Logger {

    info(message: string, data?: any) {
        logger.info(`${message}   ${undefined !== data ? JSON.stringify(data) : ''}`);
    }

    error(message: string, data?: any) {
        logger.error(`${message}   ${undefined !== data ? JSON.stringify(data) : ''}`);
    }
}