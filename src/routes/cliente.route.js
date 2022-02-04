"use strict";
exports.__esModule = true;
var ClienteController_1 = require("./../api/controller/ClienteController");
var express_1 = require("express");
var router = (0, express_1.Router)();
var clienteController = new ClienteController_1.ClienteController();
router.get('/clientes', function (req, res) {
    /*
      #swagger.tags = ['Cliente']
      #swagger.description = 'Lista todos os clientes'
      #swagger.responses[200] = {
        description: 'Clientes encontrados.'
      }
      #swagger.responses[404] = {
        description: 'Cliente não encontrado!'
      }
      #swagger.responses[500] = {
        description: 'Erro interno'
      }
    */
    clienteController.getAll().then(function (clientes) {
        if (clientes && clientes.length) {
            res.status(200).json(clientes);
        }
        else {
            res.status(404).send({ message: "Nenhum cliente encontrado!" });
        }
    })["catch"](function (err) { return res.status(500).json(err); });
});
router.get('/cliente/:id', function (req, res) {
    /*
      #swagger.tags = ['Cliente']
      #swagger.description = 'Buscar cliente pelo identificador.'
      #swagger.parameters['id'] = { description: 'Identificador do Cliente' }
      #swagger.responses[200] = {
        description: 'Cliente encontrado.'
      }
      #swagger.responses[404] = {
        description: 'Cliente não encontrado!'
      }
      #swagger.responses[500] = {
        description: 'Erro interno'
      }
    */
    clienteController.getById(req.params.id).then(function (cliente) {
        if (cliente) {
            res.status(200).json(cliente);
        }
        else {
            res.status(404).send({ message: "Cliente n\u00E3o encontrado!" });
        }
    })["catch"](function (err) { return res.status(500).json(err); });
});
router.post('/cria', function (req, res) {
    /*
      #swagger.tags = ['Cliente']
      #swagger.parameters['cliente'] = {
          in: 'body',
          description: 'Adicionando novo cliente.',
          schema: {
              $nome: 'String',
              $endereco: 'String',
              $email: 'String',
              $telefone: 'String',
              $cpf: 'String',
              $rg: 'String',
              $dataNascimento: 'Date',
              $codigo: 'String',
              $status: 'String'
          }
      }
      #swagger.responses[201] = {
          description: 'Criado com sucesso.'
      }
      #swagger.responses[500] = {
          description: 'Erro interno'
      }
    */
    clienteController.create(req.body).then(function (cliente) {
        res.status(201).send(cliente);
    })["catch"](function (err) {
        console.log(err);
        res.status(500).send(err);
    });
});
router.put('/cliente', function (req, res) {
    /*
    #swagger.tags = ['Cliente']
    #swagger.parameters['cliente'] = {
        in: 'body',
        description: 'Alterar cliente.',
        schema: {
            $id: 'String',
            $nome: 'String',
            $endereco: 'String',
            $email: 'String',
            $telefone: 'String',
            $cpf: 'String',
            $rg: 'String',
            $dataNascimento: 'Date',
            $codigo: 'String',
            $status: 'Enum'
        }
    }
    #swagger.responses[200] = {
        description: 'Alterado com sucesso.'
    }
    #swagger.responses[404] = {
      description: 'Cliente não encontrado!'
    }
    #swagger.responses[500] = {
        description: 'Erro interno'
    }
  */
    clienteController.update(req.body).then(function (cliente) {
        res.status(200).json(cliente);
    })["catch"](function (err) { return res.status(500).json(err); });
});
router["delete"]('/cliente/:id', function (req, res) {
    /*
      #swagger.tags = ['Cliente']
      #swagger.description = 'Exclui dados do cliente.'
      #swagger.parameters['id'] = { description: 'Identificador do Cliente' }
      #swagger.responses[200] = {
        description: 'Cliente deletado.'
      }
      #swagger.responses[404] = {
        description: 'Cliente não encontrado!'
      }
      #swagger.responses[500] = {
        description: 'Erro interno'
      }
    */
    clienteController["delete"](req.params.id).then(function (cliente) {
        res.status(200).json('Excluído com sucesso');
    })["catch"](function (err) { return res.status(500).json(err); });
    ;
});
exports["default"] = router;
