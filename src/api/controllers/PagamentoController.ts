import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { ControllerBase } from '../../core/ControllerBase';
import { PagamentoDTO } from '../dtos/PagamentoDTO';
import { PagamentoService } from '../services/PagamentoService';
import { IPagamento } from './../interfaces/IPagamento';

export class PagamentoController extends ControllerBase<IPagamento, PagamentoDTO, PagamentoService> {

    constructor() {
        super(PagamentoService);
    }

    create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): void {
        this.service.createList(req.body)
            .then(result => res.status(201).send(result))
            .catch(err => next(err));
    }
}
