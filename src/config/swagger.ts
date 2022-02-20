const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: '1.0.1',
        title: 'Medicar Saúde',
        description: 'Cooperativa de Saúde',
    },
    host: '',
    basePath: '/api',
    schemes: ['https', 'http'],
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'token',
            description: ''
        }
    }
}

const outputFile = './swagger.json';
const controllersFiles = [
    'src/routes/autenticacao.route',
    'src/routes/usuario.route',
    'src/routes/venda.route',
    'src/routes/cliente.route',
    'src/routes/parceiro.route',
    'src/routes/plano.route',
    'src/routes/colaborador.route',
    'src/routes/contrato.route',
    'src/routes/pagamento.route',
];

swaggerAutogen(outputFile, controllersFiles, doc);