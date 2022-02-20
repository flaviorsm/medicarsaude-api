import { NextFunction, Request, Response, Router } from 'express';
import { VendaController } from '../api/controllers/VendaController';
import { validarRegra } from '../helpers/ValidarRegra';
import { validarToken } from '../helpers/ValidarToken';
import { RegraEnum } from '../shared/enum/TipoUsuarioEnum';

const router = Router();
const controller = new VendaController();

router.post('/vendas', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Venda']
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.parameters['venda'] = {
        in: 'body',
        description: 'Adicionando novo venda.',
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
  controller.create(req, res, next);
});

router.get('/vendas', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Venda']
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.description = 'Escolha apenas um parâmetro, para listar todos os registros não informe nenhuma parâmentro.'
    #swagger.parameters['id'] = { description: 'Identificador do Venda' }
    #swagger.parameters['nome'] = { description: 'Nome do Venda' }
    #swagger.responses[200] = {
      description: 'Venda encontrado.'
    }
    #swagger.responses[404] = {
      description: 'Venda não encontrado!'
    }
    #swagger.responses[500] = {
      description: 'Erro interno'
    }
  */
  controller.find(req, res, next);
});

router.put('/vendas/:id', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response, next: NextFunction) => {
  /*
  #swagger.tags = ['Venda']
  #swagger.security = [{ "apiKeyAuth": [] }]
  #swagger.parameters['id'] = { description: 'Identificador do Venda' }
  #swagger.parameters['venda'] = {
      in: 'body',
      description: 'Alterar venda.',
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
    description: 'Venda não encontrado!'
  }
  #swagger.responses[500] = {
      description: 'Erro interno'
  }
*/
  controller.update(req, res, next);
});

router.delete('/vendas/:id', [validarToken, validarRegra([RegraEnum.ADMIN])], (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Venda']
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.description = 'Exclui dados do venda.'
    #swagger.parameters['id'] = { description: 'Identificador do Venda' }
    #swagger.responses[200] = {
      description: 'Venda deletado.'
    }
    #swagger.responses[404] = {
      description: 'Venda não encontrado!'
    }
    #swagger.responses[500] = {
      description: 'Erro interno'
    }
  */
  controller.delete(req, res, next);
});

router.patch('/vendas/:id/:status', [validarToken, validarRegra([RegraEnum.ADMIN])], (req: Request, res: Response, next: NextFunction) => {
  /*
   #swagger.tags = ['Venda']
   #swagger.security = [{ "apiKeyAuth": [] }]
   #swagger.description = 'Alterar status do venda.'
   #swagger.parameters['id'] = { description: 'Identificador do Venda' }
   #swagger.parameters['status'] = { description: 'ATIVO ou SUSPENSO ou INATIVO' }
   #swagger.responses[200] = {
     description: 'Status modificado.'
   }
   #swagger.responses[404] = {
     description: 'Venda não encontrado!'
   }
   #swagger.responses[500] = {
     description: 'Erro interno'
   }
 */
  controller.alterStatus(req, res, next);
});

export default router;