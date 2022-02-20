import { Request, Response, Router } from 'express';
import { validarRegra } from '../helpers/ValidarRegra';
import { validarToken } from '../helpers/ValidarToken';
import { RegraEnum } from '../shared/enum/TipoUsuarioEnum';
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
  controller.create(req, res);
});

router.get('/usuarios', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response) => {
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
  controller.find(req, res);
});

router.get('/usuarios/:id', [validarToken], (req: Request, res: Response) => {
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
  controller.find(req, res);
});

router.put('/usuarios/:id', [validarToken, validarRegra([RegraEnum.ADMIN])], (req: Request, res: Response) => {
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

export default router;