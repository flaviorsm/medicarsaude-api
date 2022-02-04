import * as mongoose from 'mongoose';
import { Logger } from './../logger/logger';

require('dotenv').config()
let database: mongoose.Connection;
const logger = new Logger();

export const connect = () => {
    const url = 'mongodb+srv://admin:admin@cluster0.5y686.mongodb.net/medicar-saude?retryWrites=true&w=majority';

    if (!database) {

        mongoose.connect(url);

        database = mongoose.connection;

        database.on('error', () => logger.error('Error de conexão'));

        database.once('open', () => logger.info('A conexão com o banco de dados foi bem-sucedida'));
    }

}

export const disconnect = () => {
    if (database) {

        mongoose.disconnect();

        database.once("close", () => logger.info("Desconectado do banco de dados"));
    }
};

export default database;