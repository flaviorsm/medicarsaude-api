import { NextFunction, Request, Response } from 'express';
import { UsuarioRepository } from '../api/repositories/UsuarioRepository';
import { RegraEnum } from '../shared/enum/TipoUsuarioEnum';
import { Logger } from '../shared/logger/logger';
const logger = new Logger();

export const regra = (regras: RegraEnum[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = res.locals.jwtPayload.userId;
            const usuarioRepository = new UsuarioRepository();
            const usuario = await usuarioRepository.obterSenhaRegra(id);

            if(usuario.regra === RegraEnum.ADMIN) {
                next();
            }
            else if (regras.indexOf(usuario.regra) > -1) {
                next();
            } else {
                res.status(401).send({ messagem: 'Acesso não autorizado!' });
            }

        } catch (error) {
            logger.error(`Validar Regra ==> ${error.message}`);
            res.status(401).send({ messagem: error.message });
        }
    };
};