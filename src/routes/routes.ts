import * as express from 'express';
import * as bodyParser from 'body-parser';

import ClienteRouter from './cliente.route';
import ParceiroRouter from './parceiro.route';
import PlanoRouter from './plano.route';
import ColaboradorRouter from './colaborador.route';
import ContratoRouter from './contrato.route';
import PagamentoRouter from './pagamento.route';
import VendaRouter from './venda.route';
import UsuarioRouter from './usuario.route';
import AutenticacaoRouter from './autenticacao.route';

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