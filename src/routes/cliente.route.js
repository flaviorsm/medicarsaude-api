const express = require('express');
const router = express.Router();

const clienteController = require('../api/controllers/ClienteController');

router.post('/cliente/criar', clienteController.create);

router.put('/cliente/:id/alterar', clienteController.update);

router.get('/cliente/todos', clienteController.getAll);

router.get('/cliente/buscar', clienteController.find);

module.exports = router;
