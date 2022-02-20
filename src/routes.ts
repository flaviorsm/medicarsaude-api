import * as express from 'express';
import * as bodyParser from 'body-parser';

import ClienteRouter from './routes/cliente.route';
import ParceiroRouter from './routes/parceiro.route';
import PlanoRouter from './routes/plano.route';
import ColaboradorRouter from './routes/colaborador.route';
import ContratoRouter from './routes/contrato.route';
import PagamentoRouter from './routes/pagamento.route';
import VendaRouter from './routes/venda.route';
import UsuarioRouter from './routes/usuario.route';
import AutenticacaoRouter from './routes/autenticacao.route';

class Routes {

    express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.get("/", (req, res, next) => {
            res.send('API Medicar Saúde - documentação em /api-docs');
        });

        this.express.use('/api',
            VendaRouter,
            ClienteRouter,
            ParceiroRouter,
            PlanoRouter,
            ColaboradorRouter,
            ContratoRouter,
            PagamentoRouter,
            UsuarioRouter,
            AutenticacaoRouter,
        );
    }
}

export default new Routes().express;