const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const controllersFiles = ['./src/app/controller/UsuarioController.js']

swaggerAutogen(outputFile, controllersFiles);
