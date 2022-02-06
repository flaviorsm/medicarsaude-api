import { Router } from 'express';
import { ClienteController } from './../api/controller/ClienteController';

const router = Router();
const clienteController = new ClienteController();

router.post('/clientes', (req, res) => {
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
  clienteController.create(req, res);
});

router.get('/clientes', (req, res) => {
  /*
    #swagger.tags = ['Cliente']
    #swagger.description = 'Escolha apenas um parâmetro, para listar todos os registros não informe nenhuma parâmentro.'
    #swagger.parameters['id'] = { description: 'Identificador do Cliente' }
    #swagger.parameters['nome'] = { description: 'Nome do cliente' }
    #swagger.parameters['telefone'] = { description: 'Telefone do cliente' }
    #swagger.parameters['email'] = { description: 'Email do cliente' }
    #swagger.parameters['cpf'] = { description: 'CPF do cliente' }
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
  clienteController.find(req, res);
});

router.put('/clientes/:id', (req, res) => {
  /*
  #swagger.tags = ['Cliente']
  #swagger.parameters['id'] = { description: 'Identificador do Cliente' }
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
  clienteController.update(req, res);
});

router.delete('/clientes/:id', (req, res) => {
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
  clienteController.delete(req, res);
});

router.patch('/clientes/:id/:status', (req, res) => {
  /*
   #swagger.tags = ['Cliente']
   #swagger.description = 'Alterar status do cliente.'
   #swagger.parameters['id'] = { description: 'Identificador do Cliente' }
   #swagger.parameters['status'] = { description: 'ATIVO ou SUSPENSO ou INATIVO' }
   #swagger.responses[200] = {
     description: 'Status modificado.'
   }
   #swagger.responses[404] = {
     description: 'Cliente não encontrado!'
   }
   #swagger.responses[500] = {
     description: 'Erro interno'
   }
 */
  clienteController.updateStatus(req, res);
});

export default router;