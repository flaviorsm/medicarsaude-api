const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: '1.0.0',
        title: 'Medicar Saúde',
        description: 'Cooperativa de Saúde',
    },
    host: 'http://localhost:3000/api',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const controllersFiles = ['src/routes/cliente.route']

swaggerAutogen(outputFile, controllersFiles, doc);