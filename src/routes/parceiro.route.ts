import { ParceiroController } from './../api/controllers/ParceiroController';
import { Router } from 'express';

const router = Router();
const controller = new ParceiroController();

router.post('/parceiros', (req, res) => {
  /*
    #swagger.tags = ['Parceiro']
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
  controller.create(req, res);
});

router.get('/parceiros', (req, res) => {
  /*
    #swagger.tags = ['Parceiro']
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
  controller.find(req, res);
});

router.put('/parceiros/:id', (req, res) => {
  /*
  #swagger.tags = ['Parceiro']
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
  controller.update(req, res);
});

router.delete('/parceiros/:id', (req, res) => {
  /*
    #swagger.tags = ['Parceiro']
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
  controller.delete(req, res);
});

router.patch('/parceiros/:id/:status', (req, res) => {
  /*
   #swagger.tags = ['Parceiro']
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
  controller.alterStatus(req, res);
});

export default router;