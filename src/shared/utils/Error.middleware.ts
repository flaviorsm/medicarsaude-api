import { NextFunction, Request, Response } from 'express';
import HttpException from './exceptions/HttpException';

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {

    const status = error.status || 500;

    const customError: boolean = error.constructor.name === 'NodeError' || error.constructor.name === 'SyntaxError' ? false : true;

    res.status(status).send({
        response: 'Error',
        error: {
            type: customError ? error.constructor.name : 'UnhandledError',
            path: req.path,
            statusCode: status,
            message: error.message || 'Algo errado não está certo!'
        }
    });
    next(error);
}

export default errorMiddleware;