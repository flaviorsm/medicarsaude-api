import { Router } from 'express';
import { AutenticacaoController } from './../api/controllers/AutenticacaoController';

const router = Router();
const controller = new AutenticacaoController();

router.post('/login', (req, res, next) => {
    /*
    #swagger.tags = ['Autenticação']
    #swagger.parameters['login'] = {
        in: 'body',
        description: 'Usuario e senha.',
        schema: {
            $usuario: 'string',
            $senha: 'string'
        }
    }
    */
    controller.login(req, res, next);
});

export default router;