"use strict";
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
var db_config_1 = require("../../config/db.config");
var ClienteRepository_1 = require("../repository/ClienteRepository");
var ClienteService = /** @class */ (function () {
    function ClienteService() {
        this.clienteRepository = new ClienteRepository_1.ClienteRepository();
    }
    ClienteService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clienteRepository.getAll()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClienteService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clienteRepository.getById(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClienteService.prototype.create = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var cliente, session, _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cliente = {};
                        console.log(db_config_1["default"]);
                        return [4 /*yield*/, db_config_1["default"].startSession()];
                    case 1:
                        session = _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 7, , 9]);
                        session.startTransaction();
                        _a = dto;
                        return [4 /*yield*/, this.pessoaRepository.create(dto, session).then(function (ps) { return ps[0]._id; })];
                    case 3:
                        _a.pessoa = _c.sent();
                        _b = dto;
                        return [4 /*yield*/, this.pessoaFisicaRepository.create(dto, session).then(function (pf) { return pf[0]._id; })];
                    case 4:
                        _b.pessoaFisica = _c.sent();
                        return [4 /*yield*/, this.clienteRepository.create(dto, session).then(function (cli) { return cli[0]; })];
                    case 5:
                        cliente = _c.sent();
                        return [4 /*yield*/, session.commitTransaction()];
                    case 6:
                        _c.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        error_1 = _c.sent();
                        return [4 /*yield*/, session.abortTransaction()];
                    case 8:
                        _c.sent();
                        this.logger.error(error_1);
                        throw new Error(error_1);
                    case 9:
                        session.endSession();
                        return [2 /*return*/, cliente];
                }
            });
        });
    };
    ClienteService.prototype.update = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var cliente, session, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cliente = null;
                        return [4 /*yield*/, db_config_1["default"].startSession()];
                    case 1:
                        session = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        session.startTransaction();
                        return [4 /*yield*/, this.clienteRepository.update(entity, session)];
                    case 3:
                        cliente = _a.sent();
                        return [4 /*yield*/, session.commitTransaction()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_2 = _a.sent();
                        return [4 /*yield*/, session.abortTransaction()];
                    case 6:
                        _a.sent();
                        this.logger.error(error_2);
                        throw new Error(error_2);
                    case 7:
                        session.endSession();
                        return [2 /*return*/, cliente];
                }
            });
        });
    };
    ClienteService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var session, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_config_1["default"].startSession()];
                    case 1:
                        session = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        session.startTransaction();
                        return [4 /*yield*/, this.clienteRepository["delete"](id, session)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, session.commitTransaction()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_3 = _a.sent();
                        return [4 /*yield*/, session.abortTransaction()];
                    case 6:
                        _a.sent();
                        this.logger.error(error_3);
                        throw new Error(error_3);
                    case 7:
                        session.endSession();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ClienteService;
}());
exports.ClienteService = ClienteService;
