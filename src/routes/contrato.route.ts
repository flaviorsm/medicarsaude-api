import { Router, Request, Response, NextFunction } from 'express';
import { validarRegra } from '../helpers/ValidarRegra';
import { validarToken } from '../helpers/ValidarToken';
import { RegraEnum } from '../shared/enum/TipoUsuarioEnum';
import { ContratoController } from './../api/controllers/ContratoController';

const router = Router();
const controller = new ContratoController();

router.post('/contratos', [validarToken, validarRegra([RegraEnum.ADMIN])], (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Contrato']
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.parameters['contrato'] = {
        in: 'body',
        description: 'Adicionando novo contrato.',
        schema: {
          $codigo: 'string',
          $status: 'StatusEnum',
          $plano: 'string',
          $cliente: 'string',
          $vendedor: 'string'
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

router.get('/contratos', [validarToken], (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Contrato']
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.description = 'Escolha apenas um parâmetro, para listar todos os registros não informe nenhuma parâmentro.'
    #swagger.parameters['id'] = { description: 'Identificador do Contrato' }
    #swagger.parameters['nome'] = { description: 'Nome do Cliente' }
    #swagger.parameters['codigo'] = { description: 'Código do Contrato' }
    #swagger.responses[200] = {
      description: 'Contrato encontrado.'
    }
    #swagger.responses[404] = {
      description: 'Contrato não encontrado!'
    }
    #swagger.responses[500] = {
      description: 'Erro interno'
    }
  */
  controller.find(req, res, next);
});


export default router;