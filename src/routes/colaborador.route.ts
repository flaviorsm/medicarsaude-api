import { Router } from 'express';
import { ColaboradorController } from './../api/controllers/ColaboradorController';

const router = Router();
const controller = new ColaboradorController();

router.post('/colaboradores', (req, res) => {
    /*
      #swagger.tags = ['Colaborador']
      #swagger.parameters['colaborador'] = {
          in: 'body',
          description: 'Adicionando novo colaborador.',
          schema: {
            $codigo: 'string',
            $status: 'StatusEnum',
            $funcao: 'string',
            $dataContratacao: 'Date',
            $ctps: 'string',
            $usuario: 'boolean',
            $nome: 'string',
            $email: 'string',
            $telefone: 'string',
            $cpf: 'string',
            $rg: 'string',
            $dataNascimento: 'Date',
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

router.get('/colaboradores', (req, res) => {
    /*
      #swagger.tags = ['Colaborador']
      #swagger.description = 'Escolha apenas um parâmetro, para listar todos os registros não informe nenhuma parâmentro.'
      #swagger.parameters['id'] = { description: 'Identificador do Colaborador' }
      #swagger.parameters['nome'] = { description: 'Nome do Colaborador' }
      #swagger.parameters['telefone'] = { description: 'Telefone do Colaborador' }
      #swagger.parameters['email'] = { description: 'Email do Colaborador' }
      #swagger.parameters['cpf'] = { description: 'CPF do Colaborador' }
      #swagger.parameters['cnpj'] = { description: 'CNPJ do Colaborador' }
      #swagger.responses[200] = {
        description: 'Colaborador encontrado.'
      }
      #swagger.responses[404] = {
        description: 'Colaborador não encontrado!'
      }
      #swagger.responses[500] = {
        description: 'Erro interno'
      }
    */
    controller.find(req, res);
});

router.put('/colaboradores/:id', (req, res) => {
    /*
    #swagger.tags = ['Colaborador']
    #swagger.parameters['id'] = { description: 'Identificador do Colaborador' }
    #swagger.parameters['colaborador'] = {
        in: 'body',
        description: 'Alterar colaborador.',
        schema: {
            $codigo: 'string',
            $status: 'StatusEnum',
            $funcao: 'string',
            $dataContratacao: 'Date',
            $ctps: 'string',
            $usuario: 'boolean',
            $nome: 'string',
            $email: 'string',
            $telefone: 'string',
            $cpf: 'string',
            $rg: 'string',
            $dataNascimento: 'Date',
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
      description: 'Colaborador não encontrado!'
    }
    #swagger.responses[500] = {
        description: 'Erro interno'
    }
  */
    controller.update(req, res);
});

router.delete('/colaboradores/:id', (req, res) => {
    /*
      #swagger.tags = ['Colaborador']
      #swagger.description = 'Exclui dados do colaborador.'
      #swagger.parameters['id'] = { description: 'Identificador do Colaborador' }
      #swagger.responses[200] = {
        description: 'Colaborador deletado.'
      }
      #swagger.responses[404] = {
        description: 'Colaborador não encontrado!'
      }
      #swagger.responses[500] = {
        description: 'Erro interno'
      }
    */
    controller.delete(req, res);
});

router.patch('/colaboradores/:id/:status', (req, res) => {
    /*
     #swagger.tags = ['Colaborador']
     #swagger.description = 'Alterar status do colaborador.'
     #swagger.parameters['id'] = { description: 'Identificador do Colaborador' }
     #swagger.parameters['status'] = { description: 'ATIVO ou SUSPENSO ou INATIVO' }
     #swagger.responses[200] = {
       description: 'Status modificado.'
     }
     #swagger.responses[404] = {
       description: 'Colaborador não encontrado!'
     }
     #swagger.responses[500] = {
       description: 'Erro interno'
     }
   */
    controller.alterStatus(req, res);
});

export default router;