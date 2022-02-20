import { Request, Response } from 'express';
import { IService } from '../../core/IService';

export abstract class ControllerBase<TEntity, TDto, TService extends IService<TEntity, TDto>> {

    protected service: TService;

    constructor(type: (new () => TService)) {
        this.service = new type();
    }

    find(req: Request, res: Response): void {

        if (req.params.id || req.query.id) {
            const id = (req.params.id || req.query.id) as string;
            this.service.findById(id).then(result => {
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(404).send({ message: `Não encontrado!` });
                }
            }).catch(err => res.status(500).send(err));
        }

        else if (req.query) {
            this.service.find(req.query).then(result => {
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(404).send({ message: `Nenhum encontrado!` });
                }
            }).catch(err => res.status(500).send(err));
        }

        else {
            this.service.find({}).then(result => {
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(404).send({ message: `Nenhum encontrado!` });
                }
            }).catch(err => res.status(500).send(err));
        }
    }

    create(req: Request, res: Response) {
        this.service.create(req.body)
            .then(result => res.status(201).send(result))
            .catch(err => res.status(500).send(err));
    }

    update(req: Request, res: Response) {
        this.service.update(req.params.id, req.body).then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    alterStatus(req: Request, res: Response) {

        const status = { status: req.params.status.toString().toUpperCase() };

        this.service.alterStatus(req.params.id, status)
            .then(() => {
                res.status(200).send({ message: `Status alterado com sucesso!` });
            }).catch(err => {
                res.status(500).send(err);
            });
    }

    delete(req: Request, res: Response) {
        this.service.delete(req.params.id)
            .then(() => res.status(200).send({ message: 'Excluído com sucesso' }))
            .catch(err => res.status(500).json(err));
    }
}