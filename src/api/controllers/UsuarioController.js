const usuario = require('../models/usuario');

exports.create = (req, res, next) => {
  /*
  #swagger.tags = ['Usuario']
  #swagger.parameters['usuario'] = {
    in: 'body',
    description: 'Adicionar novo usuário.',
    schema: {
      $nome: 'João Doe',
      $email: 'joao@email.com',
      $senha: '123654'
    }
  } 
  */
  usuario.create(req.body).then(data => {
    if (data) {
      res.status(201).send(data);
    }
    res.status(500).send(next);
  });
};


exports.getAll = (req, res, next) => {
  // #swagger.tags = ['Usuario']
  usuario.find({}).then(data => {
    res.status(200).send(data);
  }).catch(next);
}
