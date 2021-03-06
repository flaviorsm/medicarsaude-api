import { NextFunction, Request, Response, Router } from 'express';
import { validarRegra } from '../helpers/ValidarRegra';
import { validarToken } from '../helpers/ValidarToken';
import { RegraEnum } from '../shared/enum/TipoUsuarioEnum';
import { UsuarioController } from './../api/controllers/UsuarioController';

const router = Router();
const controller = new UsuarioController();

router.post('/usuarios', (req, res, next) => {
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
          $usuario: 'string',
          $senha: 'string',
          $dataNascimento: 'yyyy-mm-dd'
        }
    }
    #swagger.responses[201] = {
        description: 'Criado com sucesso.'
    }
    #swagger.responses[500] = {
        description: 'Erro interno'
    }
  */
  controller.create(req, res, next);
});

router.get('/usuarios', [validarToken], (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Usuario']
    #swagger.security = [{ "apiKeyAuth": [] }]
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
  controller.find(req, res, next);
});

router.get('/usuarios/:id', [validarToken], (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Usuario']
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.description = 'Escolha apenas um parâmetro, para listar todos os registros não informe nenhuma parâmentro.'
    #swagger.parameters['id'] = { description: 'Identificador do Usuario' }
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
  controller.find(req, res, next);
});

router.put('/usuarios/:id', [validarToken], (req: Request, res: Response, next: NextFunction) => {
  /*
  #swagger.tags = ['Usuario']
  #swagger.security = [{ "apiKeyAuth": [] }]
  #swagger.parameters['id'] = { description: 'Identificador do Usuario' }
  #swagger.parameters['usuario'] = {
      in: 'body',
      description: 'Alterar usuario.',
      schema: {
          $nome: 'string',
          $email: 'string',
          $telefone: 'string',
          $cpf: 'string',
          $usuario: 'string',
          $senha: 'string',
          $dataNascimento: 'yyyy-mm-dd'
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
  controller.update(req, res, next);
});

router.delete('/usuarios/:id', [validarToken, validarRegra([RegraEnum.ADMINISTRADOR])], (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Usuarios']
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.description = 'Exclui dados do Usuário.'
    #swagger.parameters['id'] = { description: 'Identificador do Usuário' }
    #swagger.responses[200] = {
      description: 'Usuário deletado.'
    }
    #swagger.responses[404] = {
      description: 'Usuário não encontrado!'
    }
    #swagger.responses[500] = {
      description: 'Erro interno'
    }
  */
  controller.delete(req, res, next);
});


export default router;