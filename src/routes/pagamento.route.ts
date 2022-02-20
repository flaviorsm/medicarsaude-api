import { Router, Request, Response } from 'express';
import { validarRegra } from '../helpers/ValidarRegra';
import { validarToken } from '../helpers/ValidarToken';
import { RegraEnum } from '../shared/enum/TipoUsuarioEnum';
import { PagamentoController } from './../api/controllers/PagamentoController';

const router = Router();
const controller = new PagamentoController();

router.post('/pagamentos', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response) => {
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
    controller.create(req, res);
});

router.get('/pagamentos', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response) => {
    /*
      #swagger.tags = ['Pagamento']
      #swagger.security = [{ "apiKeyAuth": [] }]
      #swagger.description = 'Escolha apenas um parâmetro, para listar todos os registros não informe nenhuma parâmentro.'
      #swagger.parameters['id'] = { description: 'Identificador do Pagamento' }
      #swagger.parameters['nome'] = { description: 'Nome do Cliente' }
      #swagger.parameters['codigo'] = { description: 'Código do Pagamento' }
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
    controller.find(req, res);
});

router.put('/pagamentos/:id', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Pagamento']
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.parameters['id'] = { description: 'Identificador do Pagamento' }
    #swagger.parameters['pagamento'] = {
        in: 'body',
        description: 'Alterar pagamento.',
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
    #swagger.responses[200] = {
        description: 'Alterado com sucesso.'
    }
    #swagger.responses[404] = {
      description: 'Pagamento não encontrado!'
    }
    #swagger.responses[500] = {
        description: 'Erro interno'
    }
  */
    controller.update(req, res);
});

router.delete('/pagamentos/:id', [validarToken, validarRegra([RegraEnum.ADMIN])], (req: Request, res: Response) => {
    /*
      #swagger.tags = ['Pagamento']
      #swagger.security = [{ "apiKeyAuth": [] }]
      #swagger.description = 'Exclui dados do pagamento.'
      #swagger.parameters['id'] = { description: 'Identificador do Pagamento' }
      #swagger.responses[200] = {
        description: 'Pagamento deletado.'
      }
      #swagger.responses[404] = {
        description: 'Pagamento não encontrado!'
      }
      #swagger.responses[500] = {
        description: 'Erro interno'
      }
    */
    controller.delete(req, res);
});

router.patch('/pagamentos/:id/:status', [validarToken, validarRegra([RegraEnum.ADMIN])], (req: Request, res: Response) => {
    /*
     #swagger.tags = ['Pagamento']
     #swagger.security = [{ "apiKeyAuth": [] }]
     #swagger.description = 'Alterar status do pagamento.'
     #swagger.parameters['id'] = { description: 'Identificador do Pagamento' }
     #swagger.parameters['status'] = { description: 'ATIVO ou SUSPENSO ou INATIVO' }
     #swagger.responses[200] = {
       description: 'Status modificado.'
     }
     #swagger.responses[404] = {
       description: 'Pagamento não encontrado!'
     }
     #swagger.responses[500] = {
       description: 'Erro interno'
     }
   */
    controller.alterStatus(req, res);
});

export default router;