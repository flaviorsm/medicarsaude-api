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
exports.__esModule = true;
exports.PlanoRepository = void 0;
var Repository_1 = require("../../shared/utils/Repository");
var Plano_model_1 = require("./../models/Plano.model");
var PlanoRepository = /** @class */ (function (_super) {
    __extends(PlanoRepository, _super);
    function PlanoRepository() {
        return _super.call(this, Plano_model_1.PlanoModel) || this;
    }
    return PlanoRepository;
}(Repository_1.Repository));
exports.PlanoRepository = PlanoRepository;
