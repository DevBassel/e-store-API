"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymenyController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const paymeny_service_1 = require("./paymeny.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const swagger_1 = require("@nestjs/swagger");
let PaymenyController = class PaymenyController {
    constructor(paymenyService) {
        this.paymenyService = paymenyService;
    }
    createPayment(orderId, req) {
        return this.paymenyService.createPayment(orderId, req.user);
    }
    webHook(req) {
        return this.paymenyService.webHook(req);
    }
};
exports.PaymenyController = PaymenyController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('create'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)('orderId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PaymenyController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Post)('webhook'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymenyController.prototype, "webHook", null);
exports.PaymenyController = PaymenyController = __decorate([
    (0, common_1.Controller)('paymenys'),
    (0, swagger_1.ApiTags)('Payment'),
    __metadata("design:paramtypes", [paymeny_service_1.PaymenyService])
], PaymenyController);
//# sourceMappingURL=paymeny.controller.js.map