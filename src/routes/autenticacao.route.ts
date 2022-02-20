import { Router } from 'express';
import { AutenticacaoController } from './../api/controllers/AutenticacaoController';

const router = Router();
const controller = new AutenticacaoController();

router.post('/login', (req, res) => {
    /*
    #swagger.tags = ['Login']
    #swagger.parameters['login'] = {
        in: 'body',
        description: 'Email e senha.',
        schema: {
            $email: 'string',
            $senha: 'string'
        }
    }
    */
    controller.login(req, res);
});

export default router;