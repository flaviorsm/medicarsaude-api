const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('../../config/db');

// const clienteModel = require('./Cliente');
// const pessoaModel = require('./Pessoa');
// const pessoaFisicaModel = require('./PessoaFisica');

mongoose.connect(db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));


module.exports = conn;
//module.exports = { conn, clienteModel, pessoaModel, pessoaFisicaModel };