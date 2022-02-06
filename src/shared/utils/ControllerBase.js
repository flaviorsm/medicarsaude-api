"use strict";
exports.__esModule = true;
exports.ControllerBase = void 0;
var ControllerBase = /** @class */ (function () {
    function ControllerBase(type) {
        this.service = new type();
    }
    ControllerBase.prototype.find = function (req, res) {
        if (req.params.id || req.query.id) {
            var id = (req.params.id || req.query.id);
            this.service.findById(id).then(function (result) {
                if (result) {
                    res.status(200).send(result);
                }
                else {
                    res.status(404).send({ message: "N\u00E3o encontrado!" });
                }
            })["catch"](function (err) { return res.status(500).send(err); });
        }
        else if (req.query) {
            this.service.find(req.query).then(function (result) {
                if (result) {
                    res.status(200).send(result);
                }
                else {
                    res.status(404).send({ message: "Nenhum encontrado!" });
                }
            })["catch"](function (err) { return res.status(500).send(err); });
        }
        else {
            this.service.find({}).then(function (result) {
                if (result) {
                    res.status(200).send(result);
                }
                else {
                    res.status(404).send({ message: "Nenhum encontrado!" });
                }
            })["catch"](function (err) { return res.status(500).send(err); });
        }
    };
    ControllerBase.prototype.create = function (req, res) {
        this.service.create(req.body)
            .then(function (result) { return res.status(201).send(result); })["catch"](function (err) { return res.status(500).send(err); });
    };
    ControllerBase.prototype.update = function (req, res) {
        this.service.update(req.params.id, req.body).then(function (result) {
            res.status(200).send(result);
        })["catch"](function (err) {
            res.status(500).send(err);
        });
    };
    ControllerBase.prototype.alterStatus = function (req, res) {
        var status = { status: req.params.status.toString().toUpperCase() };
        this.service.alterStatus(req.params.id, status)
            .then(function () {
            res.status(200).send({ message: "Status alterado com sucesso!" });
        })["catch"](function (err) {
            res.status(500).send(err);
        });
    };
    ControllerBase.prototype["delete"] = function (req, res) {
        this.service["delete"](req.params.id)
            .then(function () { return res.status(200).send({ message: 'Excluído com sucesso' }); })["catch"](function (err) { return res.status(500).json(err); });
    };
    return ControllerBase;
}());
exports.ControllerBase = ControllerBase;
