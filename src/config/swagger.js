const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const controllersFiles = ['src/routes/routes.js']

swaggerAutogen(outputFile, controllersFiles);
