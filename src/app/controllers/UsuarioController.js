const usuario = require('../models/usuario');

class UsuarioController {

  async store(req, res) {
    const data = await usuario.create(req.body);
    return res.json(data);
  }

  async index(req, res) {
    const data = await usuario.find({});
    return res.json(data);
  }
}

module.exports = new UsuarioController();
