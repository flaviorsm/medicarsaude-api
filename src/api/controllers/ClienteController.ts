import { Request, Response } from 'express-serve-static-core';
import { ClienteService } from '../services/ClienteService';

export class ClienteController {

    private clienteService: ClienteService;

    constructor() {
        this.clienteService = new ClienteService();
    }

    find(req: Request, res: Response) {

        if (req.params.id || req.query.id) {
            const id = (req.params.id || req.query.id) as string;
            this.clienteService.findById(id).then(cli => {
                if (cli) {
                    res.status(200).send(cli);
                } else {
                    res.status(404).send({ message: `Nenhum cliente encontrado!` });
                }
            }).catch(err => res.status(500).send(err));
        }
        else if (req.query) {
            this.clienteService.find(req.query).then(cli => {
                if (cli) {
                    res.status(200).send(cli);
                } else {
                    res.status(404).send({ message: `Nenhum cliente encontrado!` });
                }
            }).catch(err => res.status(500).send(err));
        }
        else {
            this.clienteService.find({}).then(cli => {
                if (cli) {
                    res.status(200).send(cli);
                } else {
                    res.status(404).send({ message: `Nenhum cliente encontrado!` });
                }
            }).catch(err => res.status(500).send(err));
        }
    }

    create(req: Request, res: Response) {
        this.clienteService.create(req.body).then(cliente => res.status(201).send(cliente))
            .catch(err => res.status(500).send(err));
    }

    update(req: Request, res: Response) {
        this.clienteService.update(req.params.id, req.body).then(cliente => {
            res.status(200).send(cliente);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    alterStatus(req: Request, res: Response) {

        const status = { status: req.params.status.toString().toUpperCase() };

        this.clienteService.alterStatus(req.params.id, status)
            .then(() => {
                res.status(200).send({ message: `Status alterado com sucesso!` });
            }).catch(err => {
                res.status(500).send(err);
            });
    }

    delete(req: Request, res: Response) {
        this.clienteService.delete(req.params.id)
            .then(() => res.status(200).send({ message: 'Excluído com sucesso' }))
            .catch(err => res.status(500).json(err));
    }
}