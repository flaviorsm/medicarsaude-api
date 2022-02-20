import { NextFunction, Request, Response, Router } from 'express';
import { validarRegra } from '../helpers/ValidarRegra';
import { validarToken } from '../helpers/ValidarToken';
import { RegraEnum } from '../shared/enum/TipoUsuarioEnum';
import { ParceiroController } from './../api/controllers/ParceiroController';

const router = Router();
const controller = new ParceiroController();

router.post('/parceiros', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Parceiro']
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.parameters['parceiro'] = {
        in: 'body',
        description: 'Adicionando novo parceiro.',
        schema: {
            $categoria: 'string',
            $status: 'string',
            $CRM: 'string',
            $nome: 'string',
            $email: 'string',
            $telefone: 'string',
            $cpf: 'string',
            $rg: 'string',
            $dataNascimento: 'Date',
            $cnpj: 'string',
            $nomeFantasia: 'string',
            $IE: 'string',
            $dataFundacao: 'Date',
            $cep: 'string',
            $rua: 'string',
            $bairro: 'string',
            $cidade: 'string',
            $estado: 'string'
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

router.get('/parceiros', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Parceiro']
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.description = 'Escolha apenas um parâmetro, para listar todos os registros não informe nenhuma parâmentro.'
    #swagger.parameters['id'] = { description: 'Identificador do Parceiro' }
    #swagger.parameters['nome'] = { description: 'Nome do Parceiro' }
    #swagger.parameters['telefone'] = { description: 'Telefone do Parceiro' }
    #swagger.parameters['email'] = { description: 'Email do Parceiro' }
    #swagger.parameters['cpf'] = { description: 'CPF do Parceiro' }
    #swagger.parameters['cnpj'] = { description: 'CNPJ do Parceiro' }
    #swagger.responses[200] = {
      description: 'Parceiro encontrado.'
    }
    #swagger.responses[404] = {
      description: 'Parceiro não encontrado!'
    }
    #swagger.responses[500] = {
      description: 'Erro interno'
    }
  */
  controller.find(req, res, next);
});

router.put('/parceiros/:id', [validarToken, validarRegra([RegraEnum.COLABORADOR])], (req: Request, res: Response, next: NextFunction) => {
  /*
  #swagger.tags = ['Parceiro']
  #swagger.security = [{ "apiKeyAuth": [] }]
  #swagger.parameters['id'] = { description: 'Identificador do Parceiro' }
  #swagger.parameters['parceiro'] = {
      in: 'body',
      description: 'Alterar parceiro.',
      schema: {
          $categoria: 'string',
          $status: 'string',
          $CRM: 'string',
          $nome: 'string',
          $email: 'string',
          $telefone: 'string',
          $cpf: 'string',
          $rg: 'string',
          $dataNascimento: 'Date',
          $cnpj: 'string',
          $nomeFantasia: 'string',
          $IE: 'string',
          $dataFundacao: 'Date',
          $cep: 'string',
          $rua: 'string',
          $bairro: 'string',
          $cidade: 'string',
          $estado: 'string'
      }
  }
  #swagger.responses[200] = {
      description: 'Alterado com sucesso.'
  }
  #swagger.responses[404] = {
    description: 'Parceiro não encontrado!'
  }
  #swagger.responses[500] = {
      description: 'Erro interno'
  }
*/
  controller.update(req, res, next);
});

router.delete('/parceiros/:id', [validarToken, validarRegra([RegraEnum.ADMIN])], (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.tags = ['Parceiro']
    #swagger.security = [{ "apiKeyAuth": [] }]
    #swagger.description = 'Exclui dados do parceiro.'
    #swagger.parameters['id'] = { description: 'Identificador do Parceiro' }
    #swagger.responses[200] = {
      description: 'Parceiro deletado.'
    }
    #swagger.responses[404] = {
      description: 'Parceiro não encontrado!'
    }
    #swagger.responses[500] = {
      description: 'Erro interno'
    }
  */
  controller.delete(req, res, next);
});

router.patch('/parceiros/:id/:status', [validarToken, validarRegra([RegraEnum.ADMIN])], (req: Request, res: Response, next: NextFunction) => {
  /*
   #swagger.tags = ['Parceiro']
   #swagger.security = [{ "apiKeyAuth": [] }]
   #swagger.description = 'Alterar status do parceiro.'
   #swagger.parameters['id'] = { description: 'Identificador do Parceiro' }
   #swagger.parameters['status'] = { description: 'ATIVO ou SUSPENSO ou INATIVO' }
   #swagger.responses[200] = {
     description: 'Status modificado.'
   }
   #swagger.responses[404] = {
     description: 'Parceiro não encontrado!'
   }
   #swagger.responses[500] = {
     description: 'Erro interno'
   }
 */
  controller.alterStatus(req, res, next);
});

export default router;