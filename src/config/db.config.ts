import * as mongoose from 'mongoose';
import { Logger } from '../shared/logger/logger';
require('dotenv').config()


export class Database {

    conn: mongoose.Connection;
    logger: Logger;

    constructor() {
        this.logger = new Logger();
        this.connect();
    }

    connect() {
        const url = 'mongodb+srv://admin:admin@cluster0.5y686.mongodb.net/medicar-saude?retryWrites=true&w=majority';

        if (!this.conn) {

            mongoose.connect(url);

            this.conn = mongoose.connection;

            this.conn.on('error', () => this.logger.error('Error de conexão'));

            this.conn.once('open', () => this.logger.info('A conexão com o banco de dados foi bem-sucedida'));
        }
    }

    disconnect() {
        if (this.conn) {

            mongoose.disconnect();

            this.conn.once("close", () => this.logger.info("Desconectado do banco de dados"));
        }
    }

}
