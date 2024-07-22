"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymenyModule = void 0;
const common_1 = require("@nestjs/common");
const paymeny_service_1 = require("./paymeny.service");
const paymeny_controller_1 = require("./paymeny.controller");
const order_module_1 = require("../order/order.module");
const products_module_1 = require("../products/products.module");
let PaymenyModule = class PaymenyModule {
};
exports.PaymenyModule = PaymenyModule;
exports.PaymenyModule = PaymenyModule = __decorate([
    (0, common_1.Module)({
        imports: [order_module_1.OrderModule, products_module_1.ProductsModule],
        controllers: [paymeny_controller_1.PaymenyController],
        providers: [paymeny_service_1.PaymenyService],
    })
], PaymenyModule);
//# sourceMappingURL=paymeny.module.js.map