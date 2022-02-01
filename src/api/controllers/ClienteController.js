const clienteModel = require('../models/Cliente');
const pessoaModel = require('../models/Pessoa');
const pessoaFisicaModel = require('../models/PessoaFisica');

const conn = require('../models')

exports.create = async (req, res) => {
  /*
  #swagger.tags = ['Cliente']
  #swagger.parameters['cliente'] = {
    in: 'body',
    description: 'Adicionando novo cliente.',
    schema: {
          $nome: 'String',
          $endereco: 'String',
          $email: 'String',
          $telefone: 'String',
          $cpf: 'String',
          $rg: 'String',
          $dataNascimento: 'Date',
          $codigo: 'String',
          $status: 'String'
      }
  } 
  #swagger.responses[201] = {
    description: 'Criado com sucesso.'
  }
  #swagger.responses[500] = {
    description: 'Erro interno',
  }
  */
  const session = await conn.startSession();

  try {
    session.startTransaction();

    const body = req.body;

    body.pessoa = await pessoaModel.create([body], { session }).then(ps => ps[0]._id);

    body.pessoaFisica = await pessoaFisicaModel.create([body], { session }).then(pf => pf[0]._id);

    const cliente = await clienteModel.create([body], { session });

    await session.commitTransaction();

    res.status(201).send({ message: `Cliente criado com sucesso! id: ${cliente[0]._id}` });

  } catch (error) {
    await session.abortTransaction();
    res.status(500).send({ message: `Erro ao cadastrar Cliente: ${error}` });
  }

  session.endSession();
}

exports.update = async (req, res) => {
  /*
  #swagger.tags = ['Cliente']
  #swagger.parameters['cliente'] = {
    in: 'body',
    description: 'Adicionando novo cliente.',
    schema: {
          $nome: 'String',
            $endereco: 'String',
            $email: 'String',
            $telefone: 'String',
            $cpf: 'String',
            $rg: 'String',
            $dataNascimento: 'Date',
            $codigo: 'String',
            $status: 'String'
      }
  } 
  #swagger.responses[201] = {
    description: 'Alterado com sucesso.'
  }
  #swagger.responses[404] = {
        description: 'Cliente não encontrado!'
    }
  #swagger.responses[500] = {
    description: 'Erro interno',
  }
 */
  const session = await conn.startSession();

  try {
    session.startTransaction();

    const clienteDTO = req.body;

    const cliente = await clienteModel.findByIdAndUpdate(req.params.id, clienteDTO, { session }).then(cl => cl);
    if (!cliente) {
      throw { status: 404, message: `Cliente não encontrado` };
    }

    clienteDTO.pessoaFisica = cliente.pessoaFisica;
    clienteDTO.pessoa = await pessoaFisicaModel.findByIdAndUpdate(clienteDTO.pessoaFisica, clienteDTO, { session }).then(pf => pf.pessoa);

    await pessoaModel.findByIdAndUpdate(clienteDTO.pessoa, clienteDTO, { session })

    await session.commitTransaction();

    res.status(201).send({ message: 'Cliente alterado com sucesso!' });

  } catch (error) {
    await session.abortTransaction();

    let status = 500;
    let msg = `Erro ao alterar Cliente: ${error}`;

    if (error.status) {
      status = 404;
      msg = 'Cliente não encontrado!';
    }
    res.status(status).send({ message: `${msg}` });
  } finally {
    session.endSession();
  }

}

exports.getAll = (req, res) => {
  /*
    #swagger.tags = ['Cliente']
    #swagger.description = 'Lista todos os clientes'
    #swagger.responses[200] = {
      description: 'Clientes encontrados.'
    }
    #swagger.responses[404] = {
      description: 'Cliente não encontrado!'
    }
    #swagger.responses[500] = {
      description: 'Erro interno'
    }
  */
  clienteModel
    .find({})
    .populate({
      path: 'pessoaFisica',
      populate: {
        path: 'pessoa'
      }
    })
    .then(clientes => {
      if (clientes && clientes.length > 0) {
        res.status(200).send(clientes);
      } else {
        res.status(404).send({ message: 'Clientes não encontrado!' })
      }
    })
    .catch(err => res.status(500).send({ message: `Erro: ${err}` }));
}

exports.getById = (req, res) => {
  /*
    #swagger.tags = ['Cliente']
    #swagger.description = 'Busca cliente pelo identificador.'
    #swagger.parameters['id'] = { description: 'Identificador do Cliente' }
    #swagger.responses[200] = {
      description: 'Cliente encontrado.'
    }
    #swagger.responses[404] = {
      description: 'Cliente não encontrado!'
    }
    #swagger.responses[500] = {
      description: 'Erro interno'
    }
  */
  clienteModel
    .findOne(req.params.id)
    .populate({
      path: 'pessoaFisica',
      populate: {
        path: 'pessoa'
      }
    })
    .then(cliente => {
      if (cliente) {
        res.status(200).send(cliente);
      } else {
        res.status(404).send({ message: 'Cliente não encontrado!' })
      }
    })
    .catch(err => res.status(500).send({ message: `Erro: ${err}` }));
}


exports.find = async (req, res) => {
  /*
    #swagger.tags = ['Cliente']
    #swagger.description = 'Escolha apenas um parâmetro.'
    #swagger.parameters['id'] = { description: 'Identificador do cliente' }
    #swagger.parameters['nome'] = { description: 'Nome do cliente' }
    #swagger.parameters['telefone'] = { description: 'Telefone do cliente' }
    #swagger.parameters['email'] = { description: 'Email do cliente' }
    #swagger.parameters['cpf'] = { description: 'CPF do cliente' }
    #swagger.responses[200] = {
      description: 'Cliente encontrado.'
    }
    #swagger.responses[404] = {
      description: 'Cliente não encontrado!'
    }
    #swagger.responses[500] = {
      description: 'Erro interno'
    }
  */
  try {

    if (req.query.id) {
      clienteModel
        .findById(req.query.id)
        .populate({
          path: 'pessoaFisica',
          populate: {
            path: 'pessoa'
          }
        }).then(clientes => {
          if (clientes) {
            res.status(200).send(clientes);
          } else {
            res.status(404).send({ message: 'Cliente não encontrado!' })
          }
        }).catch(err => res.status(500).send({ message: `Erro: ${err}` }));

    } else if (req.query.nome || req.query.email || req.query.telefone) {
      let query = {};
      if (req.query.nome) {
        query = { nome: { "$regex": req.query.nome, "$options": "i" } };
      } else if (req.query.email) {
        query = { email: req.query.email };
      } else {
        query = { telefone: req.query.telefone };
      }

      const pessoas = await pessoaModel.find(query);

      const clientes = [];

      for (const cli of pessoas) {
        const cliente = await clienteModel.findOne({ pessoa: cli._id })
          .populate({
            path: 'pessoaFisica',
            populate: {
              path: 'pessoa'
            }
          });
        clientes.push(cliente);
      }
      res.status(200).send(clientes);
    }

    else if (req.query.cpf) {
      const pessoaFisica = await pessoaFisicaModel.findOne({ cpf: req.query.cpf }).populate('pessoa');

      const cliente = await clienteModel.findOne({ pessoa: pessoaFisica.pessoa._id })
        .populate({
          path: 'pessoaFisica',
          populate: {
            path: 'pessoa'
          }
        });

      res.status(200).send(cliente);
    } else {
      const cliente = await clienteModel.find({})
        .populate({
          path: 'pessoaFisica',
          populate: {
            path: 'pessoa'
          }
        });

      res.status(200).send(cliente);
    }

  } catch (error) {
    res.status(500).send({ message: `Erro: ${error}` })
  }


}