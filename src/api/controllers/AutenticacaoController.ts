import { NextFunction, Request, Response } from 'express';
import { UsuarioService } from './../services/UsuarioService';

export class AutenticacaoController {

    usuarioService: UsuarioService;

    constructor() {
        this.usuarioService = new UsuarioService();
    }

    login(req: Request, res: Response, next: NextFunction) {
        const { usuario, senha } = req.body;
        if (usuario && senha) {
            this.usuarioService.login(usuario, senha)
                .then(token => res.status(200).send({ token }))
                .catch(error => next(error));
        }
    }

    changePassword(req: Request, res: Response, next: NextFunction) {
        throw new Error('Method not implemented.');
    }
}