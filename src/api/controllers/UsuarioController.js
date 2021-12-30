const usuario = require('../models/usuario');

exports.create = (req, res, next) => {
  /*
  #swagger.tags = ['Usuario']
  #swagger.parameters['usuario'] = {
    in: 'body',
    description: 'Adicionando novo usuário.',
    schema: {
      $nome: 'João Doe',
      $email: 'joao@email.com',
      $senha: '123654'
    }
  } 
  #swagger.responses[201] = {
    description: 'Criado com sucesso.',
    schema: {
      nome:'',
      email:'',
      senha:'' 
    }
  }
  #swagger.responses[500] = {
    description: 'Erro interno',
  }
  */
  usuario.create(req.body).then(data => {
    if (data) {
      res.status(201).send(true);
    }
    res.status(500).send(next);
  });
};


exports.getAll = (req, res, next) => {
  /* 
  #swagger.tags = ['Usuario']
  #swagger.responses[200] = {
    description: 'Lista de usuários obtidos com sucesso.',
    schema: [{
      nome: 'João Doe',
      email: 'joao@email.com',
      senha: '123654'
    }]
  } 
  #swagger.responses[500] = { description: 'Erro interno' }
  */
  usuario.find({}).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send(next);
  });
}
