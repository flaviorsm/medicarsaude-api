import { NextFunction, Request, Response } from 'express';
import PostNotFoundException from '../shared/utils/exceptions/PostNotFoundException';
import { IService } from './IService';

export abstract class ControllerBase<TEntity, TDto, TService extends IService<TEntity, TDto>> {

    protected service: TService;

    constructor(type: (new () => TService)) {
        this.service = new type();
    }

    find(req: Request, res: Response, next: NextFunction): void {

        if (req.params.id || req.query.id) {
            const id = (req.params.id || req.query.id) as string;
            this.service.findById(id).then(result => {
                if (result) {
                    res.status(200).send({
                        response: 'successfull',
                        data: this.service.entityToDTO(result)
                    });
                } else {
                    next(new PostNotFoundException(id));
                }
            });
        }

        else if (req.query) {
            this.service.find(req.query).then(result => {
                if (result.length > 0) {
                    res.status(200).send({
                        response: 'successfull',
                        data: this.service.entitiesToDtos(result),
                        count: result.length
                    });
                } else {
                    next(new PostNotFoundException(null, req.query));
                }
            });
        }

        else {
            this.service.find({}).then(result => {
                if (result.length > 0) {
                    res.status(200).send({
                        response: 'successfull',
                        data: this.service.entitiesToDtos(result),
                        count: result.length
                    });
                } else {
                    next(new PostNotFoundException(null, req.query));
                }
            });
        }
    }

    create(req: Request, res: Response, next: NextFunction) {
        this.service.create(req.body)
            .then(result => res.status(201).send(this.service.entityToDTO(result)))
            .catch(err => next(err));
    }

    update(req: Request, res: Response, next: NextFunction) {
        this.service.update(req.params.id, req.body)
            .then(result => res.status(200).send(this.service.entityToDTO(result)))
            .catch(err => next(err));
    }

    patch(req: Request, res: Response, next: NextFunction) {
        this.service.patch(req.params.id, req.body)
            .then(() => res.status(200).send(req.body))
            .catch(err => next(err));
    }

    alterStatus(req: Request, res: Response, next: NextFunction) {
        const status = { status: req.params.status.toString().toUpperCase() };
        this.service.alterStatus(req.params.id, status)
            .then(() => res.status(200).send({ message: `Status alterado com sucesso!` }))
            .catch(err => next(err));
    }

    delete(req: Request, res: Response, next: NextFunction) {
        this.service.delete(req.params.id)
            .then(() => res.status(200).send({ message: 'Excluído com sucesso' }))
            .catch(err => next(err));
    }
}