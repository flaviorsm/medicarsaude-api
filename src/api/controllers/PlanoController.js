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
exports.PlanoController = void 0;
var PlanoService_1 = require("./../services/PlanoService");
var ControllerBase_1 = require("../../shared/utils/ControllerBase");
var PlanoController = /** @class */ (function (_super) {
    __extends(PlanoController, _super);
    function PlanoController() {
        return _super.call(this, PlanoService_1.PlanoService) || this;
    }
    return PlanoController;
}(ControllerBase_1.ControllerBase));
exports.PlanoController = PlanoController;
