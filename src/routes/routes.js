const express = require('express');
const routes = express.Router();

const usuarioController = require('../api/controllers/UsuarioController');

routes.get("/usuario", usuarioController.getAll);

routes.post("/usuario", usuarioController.create);

module.exports = routes;
