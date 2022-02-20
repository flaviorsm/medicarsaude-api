import { Request, Response } from 'express-serve-static-core';
import { UsuarioService } from './../services/UsuarioService';

export class AutenticacaoController {

    usuarioService: UsuarioService;

    constructor() {
        this.usuarioService = new UsuarioService();
    }

    login(req: Request, res: Response) {
        const { email, senha } = req.body;
        if (email && senha) {
            this.usuarioService.login(email, senha).then(auth => {
                if (auth.autenticado) {
                    res.status(200).send(auth.token);
                } else {
                    res.status(401).send(auth.mensagem);
                }
            }).catch(error => res.status(500).send(error));
        }
    }

    changePassword(req: Request, res: Response) {
        throw new Error('Method not implemented.');
    }
}