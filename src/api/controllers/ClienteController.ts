import { NextFunction, Request, Response } from 'express';
import PostNotFoundException from '../../shared/utils/exceptions/PostNotFoundException';
import { ClienteService } from '../services/ClienteService';

export class ClienteController {

    private clienteService: ClienteService;

    constructor() {
        this.clienteService = new ClienteService();
    }

    find(req: Request, res: Response, next: NextFunction) {

        if (req.params.id || req.query.id) {
            const id = (req.params.id || req.query.id) as string;
            this.clienteService.findById(id).then(cli => {
                if (cli) {
                    res.status(200).send({
                        response: 'successfull',
                        data: cli
                    });
                } else {
                    next(new PostNotFoundException(id));
                }
            }).catch(err => next(err));
        }
        else if (req.query) {
            this.clienteService.find(req.query).then(cli => {
                if (cli.length > 0) {
                    res.status(200).send({
                        response: 'successfull',
                        data: cli,
                        count: cli.length
                    });
                } else {
                    next(new PostNotFoundException(null, req.query));
                }
            }).catch(err => next(err));
        }
        else {
            this.clienteService.find({}).then(cli => {
                if (cli.length > 0) {
                    res.status(200).send({
                        response: 'successfull',
                        data: cli,
                        count: cli.length
                    });
                } else {
                    next(new PostNotFoundException(null, req.query));
                }
            }).catch(err => next(err));
        }
    }

    create(req: Request, res: Response, next: NextFunction) {
        this.clienteService.create(req.body)
            .then(cli => res.status(201).send({ response: 'successfull', data: cli }))
            .catch(err => next(err));
    }

    update(req: Request, res: Response, next: NextFunction) {
        this.clienteService.update(req.params.id, req.body)
            .then(cli => res.status(201).send({ response: 'successfull', data: cli }))
            .catch(err => next(err));
    }

    alterStatus(req: Request, res: Response, next: NextFunction) {

        const status = { status: req.params.status.toString().toUpperCase() };

        this.clienteService.alterStatus(req.params.id, status)
            .then(() => {
                res.status(200).send({ message: `Status alterado com sucesso!` });
            }).catch(err => next(err));
    }

    delete(req: Request, res: Response, next: NextFunction) {
        this.clienteService.delete(req.params.id)
            .then(() => res.status(200).send({ message: 'Excluído com sucesso' }))
            .catch(err => next(err));
    }
}