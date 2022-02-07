"use strict";
exports.__esModule = true;
var express_1 = require("express");
var PlanoController_1 = require("./../api/controllers/PlanoController");
var router = (0, express_1.Router)();
var controller = new PlanoController_1.PlanoController();
router.post('/planos', function (req, res) {
    /*
      #swagger.tags = ['Plano']
      #swagger.parameters['plano'] = {
          in: 'body',
          description: 'Adicionando novo plano.',
          schema: {
            $nome: 'string',
            $descricao: 'string',
            $valor: 'Number',
            $status: 'StatusEnum',
          }
      }
      #swagger.responses[201] = {
          description: 'Criado com sucesso.'
      }
      #swagger.responses[500] = {
          description: 'Erro interno'
      }
    */
    controller.create(req, res);
});
router.get('/planos', function (req, res) {
    /*
      #swagger.tags = ['Plano']
      #swagger.description = 'Escolha apenas um parâmetro, para listar todos os registros não informe nenhuma parâmentro.'
      #swagger.parameters['id'] = { description: 'Identificador do Plano' }
      #swagger.parameters['nome'] = { description: 'Nome do Plano' }
      #swagger.responses[200] = {
        description: 'Plano encontrado.'
      }
      #swagger.responses[404] = {
        description: 'Plano não encontrado!'
      }
      #swagger.responses[500] = {
        description: 'Erro interno'
      }
    */
    controller.find(req, res);
});
router.put('/planos/:id', function (req, res) {
    /*
    #swagger.tags = ['Plano']
    #swagger.parameters['id'] = { description: 'Identificador do Plano' }
    #swagger.parameters['plano'] = {
        in: 'body',
        description: 'Alterar plano.',
        schema: {
            $nome: 'string',
            $descricao: 'string',
            $valor: 'Number',
            $status: 'StatusEnum',
        }
    }
    #swagger.responses[200] = {
        description: 'Alterado com sucesso.'
    }
    #swagger.responses[404] = {
      description: 'Plano não encontrado!'
    }
    #swagger.responses[500] = {
        description: 'Erro interno'
    }
  */
    controller.update(req, res);
});
router["delete"]('/planos/:id', function (req, res) {
    /*
      #swagger.tags = ['Plano']
      #swagger.description = 'Exclui dados do plano.'
      #swagger.parameters['id'] = { description: 'Identificador do Plano' }
      #swagger.responses[200] = {
        description: 'Plano deletado.'
      }
      #swagger.responses[404] = {
        description: 'Plano não encontrado!'
      }
      #swagger.responses[500] = {
        description: 'Erro interno'
      }
    */
    controller["delete"](req, res);
});
router.patch('/planos/:id/:status', function (req, res) {
    /*
     #swagger.tags = ['Plano']
     #swagger.description = 'Alterar status do plano.'
     #swagger.parameters['id'] = { description: 'Identificador do Plano' }
     #swagger.parameters['status'] = { description: 'ATIVO ou SUSPENSO ou INATIVO' }
     #swagger.responses[200] = {
       description: 'Status modificado.'
     }
     #swagger.responses[404] = {
       description: 'Plano não encontrado!'
     }
     #swagger.responses[500] = {
       description: 'Erro interno'
     }
   */
    controller.alterStatus(req, res);
});
exports["default"] = router;
