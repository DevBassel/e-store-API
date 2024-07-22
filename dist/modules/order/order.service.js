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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("../cart/cart.service");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const typeorm_2 = require("typeorm");
const order_item_entity_1 = require("./entities/order-item.entity");
const email_service_1 = require("../email/email.service");
const order_templet_1 = require("../email/templates/order.templet");
const order_status_enum_1 = require("./enums/order-status.enum");
const payment_status_enum_1 = require("./enums/payment-status.enum");
const coupons_service_1 = require("../coupons/coupons.service");
const paginate_1 = require("../../utils/paginate");
let OrderService = class OrderService {
    constructor(cartServices, orderRepo, orderItemRepo, emailServiec, couponServiec) {
        this.cartServices = cartServices;
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.emailServiec = emailServiec;
        this.couponServiec = couponServiec;
    }
    async create(createOrderDto, user) {
        const cartItems = await this.cartServices.findAll(user);
        if (!cartItems)
            throw new common_1.GoneException('your cart is empty O_o !!');
        const coupon = await this.couponServiec.validateCoupon(createOrderDto.coupon);
        console.log(coupon);
        const total = cartItems.items.reduce((p, c) => p + c.price, 0);
        const createOrder = await this.orderRepo.save({
            ...createOrderDto,
            userId: user.id,
            total: coupon ? total - coupon.discount : total,
            shipingDate: new Date().toISOString(),
            coupon: coupon.value,
        });
        const orderItems = cartItems.items.map((item) => ({
            orderId: createOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price_at_buy: item.product.price,
        }));
        await this.orderItemRepo.save(orderItems);
        await this.cartServices.clearCart(cartItems.id);
        this.emailServiec.sendEmail({
            to: user.email,
            subject: 'Confiarm Order',
            html: (0, order_templet_1.orederTepm)({ products: cartItems.items }),
        });
        return createOrder;
    }
    findAll(user, page, limit, status) {
        const Q = this.orderRepo
            .createQueryBuilder('order')
            .leftJoin('order.items', 'items')
            .leftJoin('items.product', 'product')
            .where('order.userId = :id', { id: user.id })
            .select(['order', 'items', 'product']);
        status && Q.andWhere('order.status = :status', { status });
        return (0, paginate_1.paginate)(Q, page, limit);
    }
    async findOne(id, user) {
        const order = await this.orderRepo.findOne({
            where: { id, userId: user.id },
            relations: { items: { product: true } },
        });
        if (!order)
            throw new common_1.NotFoundException('order not found');
        return order;
    }
    async update(id, updateOrderDto, user) {
        const order = await this.findOne(id, user);
        if (!order)
            throw new common_1.NotFoundException('oreder not found');
        return this.orderRepo.save({
            ...order,
            ...updateOrderDto,
        });
    }
    async cancel(id, user) {
        await this.update(id, {
            paymentStatus: payment_status_enum_1.PaymentStatus.CANCEL,
            status: order_status_enum_1.OrderStatus.CANCEL,
        }, user);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => cart_service_1.CartService))),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [cart_service_1.CartService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService,
        coupons_service_1.CouponsService])
], OrderService);
//# sourceMappingURL=order.service.js.map