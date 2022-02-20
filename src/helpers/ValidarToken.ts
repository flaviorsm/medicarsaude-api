import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Logger } from '../shared/logger/logger';

require('dotenv').config()
const logger = new Logger();

export const validarToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.token as string;
    let jwtPayload;

    try {
        jwtPayload = (jwt.verify(token, process.env.jwtSecret) as any);
        res.locals.jwtPayload = jwtPayload;

    } catch (error) {
        logger.info(`Erro ao validar token: `, error);
        res.status(401).send({ messagem: 'Token inválido!' });
        return;
    }

    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, process.env.jwtSecret, {
        expiresIn: '1h'
    });

    res.setHeader('token', newToken);

    next();
};