"use strict";
exports.__esModule = true;
exports.ClienteController = void 0;
var ClienteService_1 = require("./../services/ClienteService");
var ClienteController = /** @class */ (function () {
    function ClienteController() {
        this.clienteService = new ClienteService_1.ClienteService();
    }
    ClienteController.prototype.find = function (req, res) {
        if (req.params.id || req.query.id) {
            var id = (req.params.id || req.query.id);
            this.clienteService.findById(id).then(function (cli) {
                if (cli) {
                    res.status(200).send(cli);
                }
                else {
                    res.status(404).send({ message: "Nenhum cliente encontrado!" });
                }
            })["catch"](function (err) { return res.status(500).send(err); });
        }
        else if (req.query) {
            this.clienteService.find(req.query).then(function (cli) {
                if (cli) {
                    res.status(200).send(cli);
                }
                else {
                    res.status(404).send({ message: "Nenhum cliente encontrado!" });
                }
            })["catch"](function (err) { return res.status(500).send(err); });
        }
        else {
            this.clienteService.find().then(function (cli) {
                if (cli) {
                    res.status(200).send(cli);
                }
                else {
                    res.status(404).send({ message: "Nenhum cliente encontrado!" });
                }
            })["catch"](function (err) { return res.status(500).send(err); });
        }
    };
    ClienteController.prototype.create = function (req, res) {
        this.clienteService.create(req.body).then(function (cliente) { return res.status(201).send(cliente); })["catch"](function (err) { return res.status(500).send(err); });
    };
    ClienteController.prototype.update = function (req, res) {
        this.clienteService.update(req.params.id, req.body).then(function (cliente) {
            res.status(200).send(cliente);
        })["catch"](function (err) {
            res.status(500).send(err);
        });
    };
    ClienteController.prototype.updateStatus = function (req, res) {
        var status = null;
        if (req.params.status) {
            status = { status: req.params.status.toString().toUpperCase() };
        }
        else {
            status = req.body;
        }
        this.clienteService.updateStatus(req.params.id, status).then(function () {
            res.status(200).send({ message: "Status alterado com sucesso!" });
        })["catch"](function (err) {
            res.status(500).send(err);
        });
    };
    ClienteController.prototype["delete"] = function (req, res) {
        this.clienteService["delete"](req.params.id).then(function () { return res.status(200).send({ message: 'Excluído com sucesso' }); })["catch"](function (err) { return res.status(500).json(err); });
    };
    return ClienteController;
}());
exports.ClienteController = ClienteController;
