const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: '1.0.0',
        title: 'Medicar Saúde',
        description: 'Cooperativa de Saúde',
    },
    host: 'medicarsaude-api.herokuapp.com/api',
    schemes: ['https'],
};

const outputFile = '/swagger.json';
const controllersFiles = [
    'src/routes/venda.route',
    'src/routes/cliente.route', 
    'src/routes/parceiro.route', 
    'src/routes/plano.route',
    'src/routes/colaborador.route',
    'src/routes/contrato.route',
    'src/routes/pagamento.route',
];

swaggerAutogen(outputFile, controllersFiles, doc);