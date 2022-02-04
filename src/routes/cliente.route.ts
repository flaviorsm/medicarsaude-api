import { Logger } from './../logger/logger';
import { ClienteController } from './../api/controller/ClienteController';
import { Router } from 'express';

const router = Router();
const clienteController = new ClienteController();

router.get('/clientes', (req, res) => {
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
  clienteController.getAll().then(clientes => {
    if (clientes && clientes.length) {
      res.status(200).json(clientes);
    } else {
      res.status(404).send({ message: `Nenhum cliente encontrado!` });
    }
  }).catch(err => res.status(500).json(err));
});


router.get('/cliente/:id', (req, res) => {
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
  clienteController.getById(req.params.id).then(cliente => {
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).send({ message: `Cliente não encontrado!` });
    }
  }).catch(err => res.status(500).json(err));
});

router.post('/cria', (req, res) => {
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
  clienteController.create(req.body).then(cliente => {
    res.status(201).send(cliente);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err)
  });
});

router.put('/cliente', (req, res) => {
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
  clienteController.update(req.body).then(cliente => {
    res.status(200).json(cliente);
  }).catch(err => res.status(500).json(err));
});

router.delete('/cliente/:id', (req, res) => {
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
  clienteController.delete(req.params.id).then(cliente => {
    res.status(200).json('Excluído com sucesso');
  }).catch(err => res.status(500).json(err));;
});

export default router;