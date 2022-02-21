import { Router, Request, Response, NextFunction } from 'express';
import { validarRegra } from '../helpers/ValidarRegra';
import { validarToken } from '../helpers/ValidarToken';
import { RegraEnum } from '../shared/enum/TipoUsuarioEnum';
import { PagamentoController } from './../api/controllers/PagamentoController';

const router = Router();
const controller = new PagamentoController();

router.post('/pagamentos', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response, next: NextFunction) => {
    /*
      #swagger.tags = ['Pagamento']
      #swagger.security = [{ "apiKeyAuth": [] }]
      #swagger.parameters['pagamento'] = {
          in: 'body',
          description: 'Adicionando novo pagamento.',
          schema: {
            $codigo: 'string',
            $referencia: 'Date',
            $valorPago: 'number',
            $dataVencimento: 'Date',
            $dataPagamento: 'Date',
            $status: 'string',
            $contrato: 'string'
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

router.get('/pagamentos', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response, next: NextFunction) => {
    /*
      #swagger.tags = ['Pagamento']
      #swagger.security = [{ "apiKeyAuth": [] }]
      #swagger.description = 'Escolha apenas um parâmetro, para listar todos os registros não informe nenhuma parâmentro.'
      #swagger.parameters['id'] = { description: 'Identificador do Pagamento' }
      #swagger.parameters['nome'] = { description: 'Nome do Cliente' }
      #swagger.parameters['codigo'] = { description: 'Código do Pagamento' }
      #swagger.parameters['contrato'] = { description: 'Identificador do contrato' }
      #swagger.responses[200] = {
        description: 'Pagamento encontrado.'
      }
      #swagger.responses[404] = {
        description: 'Pagamento não encontrado!'
      }
      #swagger.responses[500] = {
        description: 'Erro interno'
      }
    */
    controller.find(req, res, next);
});


export default router;