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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymenyService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
const order_service_1 = require("../order/order.service");
const payment_status_enum_1 = require("../order/enums/payment-status.enum");
const products_service_1 = require("../products/products.service");
const order_status_enum_1 = require("../order/enums/order-status.enum");
let PaymenyService = class PaymenyService {
    constructor(config, orderService, productService) {
        this.config = config;
        this.orderService = orderService;
        this.productService = productService;
        this.stripe = new stripe_1.default(config.getOrThrow('STRIPE_SK'));
    }
    async createPayment(orderId, user) {
        const order = await this.orderService.findOne(orderId, user);
        if (order.paymentStatus === payment_status_enum_1.PaymentStatus.DONE)
            throw new common_1.ConflictException('order has been paid');
        const intent = await this.stripe.paymentIntents.create({
            amount: order.total * 100,
            currency: 'USD',
            metadata: {
                orderId: orderId,
                user: JSON.stringify(user),
            },
        });
        return intent.client_secret;
    }
    async webHook(req, sig) {
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEEBHOOK_SK);
        }
        catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            console.log(err);
            return;
        }
        switch (event.type) {
            case 'payment_intent.succeeded':
                const payment = event.data.object;
                const orderId = +payment.metadata.orderId;
                const user = JSON.parse(payment.metadata.user);
                const successOrder = await this.orderService.update(orderId, {
                    paymentStatus: payment_status_enum_1.PaymentStatus.DONE,
                    status: order_status_enum_1.OrderStatus.PENDING,
                }, user);
                successOrder.items.forEach(async (item) => {
                    const product = await this.productService.findOne(item.productId);
                    await this.productService.update(item.productId, {
                        stock: product.stock - item.quantity,
                    });
                });
                break;
            case 'payment_intent.canceled':
                await this.orderService.update(orderId, {
                    paymentStatus: payment_status_enum_1.PaymentStatus.CANCEL,
                    status: order_status_enum_1.OrderStatus.CANCEL,
                }, user);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        return;
    }
};
exports.PaymenyService = PaymenyService;
exports.PaymenyService = PaymenyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        order_service_1.OrderService,
        products_service_1.ProductsService])
], PaymenyService);
//# sourceMappingURL=paymeny.service.js.map