const express = require('express');
const routes = express.Router();

const usuarioController = require('./app/controllers/UsuarioController');

routes.get("/", function(req, res) {
  return res.send("Minha primeira rota!");
});

routes.get("/usuario", usuarioController.index);

routes.post("/usuario", usuarioController.store);


module.exports = routes;