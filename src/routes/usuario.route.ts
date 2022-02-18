import { Router } from 'express';
import { UsuarioController } from './../api/controllers/UsuarioController';

const router = Router();
const controller = new UsuarioController();

router.post('/usuarios', (req, res) => {
  /*
    #swagger.tags = ['Usuario']
    #swagger.parameters['usuario'] = {
        in: 'body',
        description: 'Adicionando novo usuario.',
        schema: {
          $nome: 'string',
          $email: 'string',
          $telefone: 'string',
          $cpf: 'string',
          $senha: 'string',
          $dataNascimento: "yyyy-mm-dd"
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

router.get('/usuarios', (req, res) => {
  /*
    #swagger.tags = ['Usuario']
    #swagger.description = 'Escolha apenas um parâmetro, para listar todos os registros não informe nenhuma parâmentro.'
    #swagger.parameters['id'] = { description: 'Identificador do Usuario' }
    #swagger.parameters['nome'] = { description: 'Nome do Usuario' }
    #swagger.responses[200] = {
      description: 'Usuario encontrado.'
    }
    #swagger.responses[404] = {
      description: 'Usuario não encontrado!'
    }
    #swagger.responses[500] = {
      description: 'Erro interno'
    }
  */
  controller.find(req, res);
});

router.put('/usuarios/:id', (req, res) => {
  /*
  #swagger.tags = ['Usuario']
  #swagger.parameters['id'] = { description: 'Identificador do Usuario' }
  #swagger.parameters['usuario'] = {
      in: 'body',
      description: 'Alterar usuario.',
      schema: {
          $nome: 'string',
          $email: 'string',
          $telefone: 'string',
          $cpf: 'string',
          $senha: 'string',
      }
  }
  #swagger.responses[200] = {
      description: 'Alterado com sucesso.'
  }
  #swagger.responses[404] = {
    description: 'Usuario não encontrado!'
  }
  #swagger.responses[500] = {
      description: 'Erro interno'
  }
*/
  controller.update(req, res);
});

router.delete('/usuarios/:id', (req, res) => {
  /*
    #swagger.tags = ['Usuario']
    #swagger.description = 'Exclui dados do usuario.'
    #swagger.parameters['id'] = { description: 'Identificador do Usuario' }
    #swagger.responses[200] = {
      description: 'Usuario deletado.'
    }
    #swagger.responses[404] = {
      description: 'Usuario não encontrado!'
    }
    #swagger.responses[500] = {
      description: 'Erro interno'
    }
  */
  controller.delete(req, res);
});

router.patch('/usuarios/:id/:status', (req, res) => {
  /*
   #swagger.tags = ['Usuario']
   #swagger.description = 'Alterar status do usuario.'
   #swagger.parameters['id'] = { description: 'Identificador do Usuario' }
   #swagger.parameters['status'] = { description: 'ATIVO ou SUSPENSO ou INATIVO' }
   #swagger.responses[200] = {
     description: 'Status modificado.'
   }
   #swagger.responses[404] = {
     description: 'Usuario não encontrado!'
   }
   #swagger.responses[500] = {
     description: 'Erro interno'
   }
 */
  controller.alterStatus(req, res);
});

export default router;