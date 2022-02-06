"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ClienteService = void 0;
var Status_enum_1 = require("../../shared/enum/Status.enum");
var ServiceBase_1 = require("../../shared/utils/ServiceBase");
var ClienteRepository_1 = require("../repositories/ClienteRepository");
var ClienteService = /** @class */ (function (_super) {
    __extends(ClienteService, _super);
    function ClienteService() {
        var _this = _super.call(this) || this;
        _this.clienteRepository = new ClienteRepository_1.ClienteRepository();
        return _this;
    }
    ClienteService.prototype.find = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var clientes, pessoa, _i, pessoa_1, ps, pf, cl, pessoaFisica;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(query.nome || query.email || query.telefone)) return [3 /*break*/, 7];
                        if (query.nome) {
                            query = { nome: { "$regex": query.nome, "$options": "i" } };
                        }
                        clientes = [];
                        return [4 /*yield*/, this.pessoaRepository.find(query)];
                    case 1:
                        pessoa = _a.sent();
                        _i = 0, pessoa_1 = pessoa;
                        _a.label = 2;
                    case 2:
                        if (!(_i < pessoa_1.length)) return [3 /*break*/, 6];
                        ps = pessoa_1[_i];
                        return [4 /*yield*/, this.pessoaFisicaRepository.findOne({ pessoa: ps._id })];
                    case 3:
                        pf = _a.sent();
                        return [4 /*yield*/, this.clienteRepository.findOne({ pessoaFisica: pf._id })];
                    case 4:
                        cl = _a.sent();
                        clientes.push(cl);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, clientes];
                    case 7:
                        if (!query.cpf) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.pessoaFisicaRepository.findOne(query)];
                    case 8:
                        pessoaFisica = _a.sent();
                        return [4 /*yield*/, this.clienteRepository.findOne({ pessoaFisica: pessoaFisica._id })];
                    case 9: return [2 /*return*/, _a.sent()];
                    case 10:
                        if (!query.codigo) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.clienteRepository.findOne(query)];
                    case 11: return [2 /*return*/, _a.sent()];
                    case 12: return [4 /*yield*/, this.clienteRepository.find()];
                    case 13: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClienteService.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clienteRepository.findById(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClienteService.prototype.create = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var cliente, session, _a, _b, _c, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        cliente = null;
                        return [4 /*yield*/, this.database.conn.startSession()];
                    case 1:
                        session = _d.sent();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 8, , 10]);
                        session.startTransaction();
                        _a = dto;
                        return [4 /*yield*/, this.enderecoRepository.create(dto, session).then(function (ed) { return ed[0]._id; })];
                    case 3:
                        _a.endereco = _d.sent();
                        _b = dto;
                        return [4 /*yield*/, this.pessoaRepository.create(dto, session).then(function (ps) { return ps[0]._id; })];
                    case 4:
                        _b.pessoa = _d.sent();
                        _c = dto;
                        return [4 /*yield*/, this.pessoaFisicaRepository.create(dto, session).then(function (pf) { return pf[0]._id; })];
                    case 5:
                        _c.pessoaFisica = _d.sent();
                        return [4 /*yield*/, this.clienteRepository.create(dto, session).then(function (cli) { return cli[0]; })];
                    case 6:
                        cliente = _d.sent();
                        return [4 /*yield*/, session.commitTransaction()];
                    case 7:
                        _d.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        error_1 = _d.sent();
                        return [4 /*yield*/, session.abortTransaction()];
                    case 9:
                        _d.sent();
                        this.logger.error(error_1);
                        throw new Error(error_1);
                    case 10:
                        session.endSession();
                        if (!cliente) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.clienteRepository.findById(cliente._id).then(function (cli) { return cli; })];
                    case 11: return [2 /*return*/, _d.sent()];
                    case 12: return [2 /*return*/, cliente];
                }
            });
        });
    };
    ClienteService.prototype.update = function (id, dto) {
        return __awaiter(this, void 0, void 0, function () {
            var session, cliente, pessoaFisica, pessoa, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.conn.startSession()];
                    case 1:
                        session = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 10]);
                        session.startTransaction();
                        return [4 /*yield*/, this.clienteRepository.update(id, dto, session).then(function (cli) {
                                if (cli) {
                                    return cli;
                                }
                                throw new Error("Cliente ".concat(dto.nome, " n\u00E3o encontrado"));
                            })["catch"](function (err) {
                                throw new Error("Erro ao alterar Cliente: ".concat(err));
                            })];
                    case 3:
                        cliente = _a.sent();
                        return [4 /*yield*/, this.pessoaFisicaRepository.update(cliente.pessoaFisica.toString(), dto, session).then(function (pf) { return pf; })["catch"](function (err) {
                                throw new Error("Erro ao alterar Pessoa Fisica: ".concat(err));
                            })];
                    case 4:
                        pessoaFisica = _a.sent();
                        return [4 /*yield*/, this.pessoaRepository.update(pessoaFisica.pessoa.toString(), dto, session).then(function (pes) { return pes; })["catch"](function (err) {
                                throw new Error("Erro ao alterar Pessoa: ".concat(err));
                            })];
                    case 5:
                        pessoa = _a.sent();
                        return [4 /*yield*/, this.enderecoRepository.update(pessoa.endereco.toString(), dto, session).then(function (end) { return end; })["catch"](function (err) {
                                throw new Error("Erro ao alterar Endere\u00E7o: ".concat(err));
                            })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, session.commitTransaction()];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        error_2 = _a.sent();
                        return [4 /*yield*/, session.abortTransaction()];
                    case 9:
                        _a.sent();
                        this.logger.error(error_2);
                        throw new Error(error_2);
                    case 10:
                        session.endSession();
                        return [4 /*yield*/, this.findById(id).then(function (res) { return res; })];
                    case 11: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClienteService.prototype["delete"] = function (id) {
        return this.clienteRepository.update(id, { status: Status_enum_1.StatusEnum.INATIVO });
    };
    ClienteService.prototype.alterStatus = function (id, body) {
        return this.clienteRepository.update(id, body);
    };
    return ClienteService;
}(ServiceBase_1.ServiceBase));
exports.ClienteService = ClienteService;
