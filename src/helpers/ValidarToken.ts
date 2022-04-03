import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Logger } from '../shared/logger/logger';
import HttpException from '../shared/utils/exceptions/HttpException';

require('dotenv').config()
const logger = new Logger();

export const validarToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.token as string;
    let jwtPayload;

    try {
        jwtPayload = (jwt.verify(token, process.env.jwtSecret) as any);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        logger.error(`Validar Regra ==> ${error.message}`);
        throw new HttpException(401, error.message);
    }

    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, process.env.jwtSecret, {
        expiresIn: '1h'
    });

    res.setHeader('token', newToken);

    next();
};