import { Logger } from '../shared/logger/logger';
import { sign, verify } from 'jsonwebtoken';

require('dotenv').config();

export class JWT {

    logger: Logger;

    constructor() {
        this.logger = new Logger();
    }

    authenticateToken(req: any, res: any, next: any) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            verify(token, process.env.TOKEN_SECRET, (err: any, user: any) => {
                if (err) {
                    this.logger.error(`Erro: ==> ${err}`);
                    return res.sendStatus(403);
                }
                this.logger.info(`Usuário: => `, user);
                req.user = user
                next()
            })
        } else {
            return res.sendStatus(401);
        }
    }

    generateAccessToken(nomeUsuario: string) {
        sign({ data: nomeUsuario }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    }
}
